import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { ApiObject } from './apiobject';
import { ApiBaseFunctionService } from './api-base-function.service';


/**
 * Recursively freeze object.
 *
 * ONLY use this if you are sure what objects this will freeze!
 *
 * @param obj the object to freeze
 */
export function freezeObject<T>(obj: T): Readonly<T> {
    if (Object.isFrozen(obj)) { return; }
    const propNames = Object.getOwnPropertyNames(obj);
    // Freeze properties before freezing self
    for (const key of propNames) {
        const value = obj[key];
        if (value && typeof value === 'object') {
            obj[key] = freezeObject(value);
        } else {
            obj[key] = value;
        }
    }
    return Object.freeze(obj);
}


/**
 * Service to interact with the mico api.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private streams: Map<string, Subject<Readonly<ApiObject> | Readonly<ApiObject[]>>> = new Map();

    constructor(private rest: ApiBaseFunctionService, ) { }

    /**
     * Canonize a resource url.
     *
     * (Remove schema, host, port, api path prefix and leading/trailing slashes.)
     *
     * @param streamURL resource url
     */
    private canonizeStreamUrl(streamURL: string): string {
        try {
            const x = new URL(streamURL);
            streamURL = x.pathname;
        } catch (TypeError) { }
        streamURL = streamURL.replace(/(^\/)|(\/$)/g, '');
        return streamURL;
    }

    /**
     * Fetch the stream source for the given resource url.
     *
     * @param streamURL resource url
     * @param defaultSubject function to create a new streamSource if needed (default: BehaviourSubject)
     */
    private getStreamSource(streamURL: string, defaultSubject: () => Subject<Readonly<ApiObject> | Readonly<ApiObject[]>> =
        () => new BehaviorSubject<Readonly<ApiObject> | Readonly<ApiObject[]>>(undefined)
    ): Subject<Readonly<ApiObject> | Readonly<ApiObject[]>> {
        streamURL = this.canonizeStreamUrl(streamURL);
        let stream = this.streams.get(streamURL);
        if (stream == null) {
            stream = defaultSubject();
            if (stream != null) {
                this.streams.set(streamURL, stream);
            }
        }
        return stream;
    }

    getModelDefinitions() {
        const resource = 'models';
        const stream = this.getStreamSource(resource);

        // TODO replace URL with a generic path

        this.rest.get('http://localhost:8080/v2/api-docs').subscribe(val => {
            // return actual service list
            stream.next((val as ApiObject).definitions as ApiObject);
        });

        return (stream.asObservable() as Observable<ApiObject>).pipe(
            filter(data => data !== undefined)
        );
    }


    // =================
    // APPLICATION CALLS
    // =================

    /**
     * Get application list
     */
    getApplications(): Observable<Readonly<ApiObject>> {

        const resource = 'applications';
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            // return actual application list
            stream.next(freezeObject((val as ApiObject)._embedded.applicationList as ApiObject));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }

    getApplicationById(id): Observable<Readonly<ApiObject>> {
        // TODO check if there is a resource for single applications
        const resource = 'applications';
        const stream = this.getStreamSource(resource);

        // TODO
        const mockData: ApiObject = {
            '_links': 'self',
            'id': id,
            'name': 'Hello World Application id ' + id,
            'shortName': 'test.' + id + 'application',
            'description': 'A generic application',
        };

        stream.next(mockData);

        return (stream.asObservable() as Observable<ApiObject>).pipe(
            filter(data => data !== undefined)
        );
    }

    /**
     * get an application based on its shortName and version
     *
     * @param shortName of the application
     * @param version of the application
     */
    getApplication(shortName: string, version: string) {
        const resource = 'applications/' + shortName + '/' + version;
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            stream.next(freezeObject((val as ApiObject)));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }

    postApplication(data) {
        if (data == null) {
            return;
        }


        const resource = 'applications/';

        return this.rest.post(resource, data).pipe(flatMap(val => {

            const stream = this.getStreamSource(val._links.self.href);
            stream.next(val);

            this.getApplications();

            return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
                filter(service => service !== undefined)
            );
        }));
    }

    // =============
    // SERVICE CALLS
    // =============

    /**
     * Get service list
     */
    getServices(): Observable<Readonly<ApiObject>> {
        const resource = 'services';
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            // return actual service list
            stream.next(freezeObject((val as ApiObject)._embedded.serviceList as ApiObject));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }

    /**
     * Get all versions of a service based on its shortName
     */
    getServiceVersions(shortName): Observable<ApiObject> {

        const resource = 'services/' + shortName + '/';
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            let list = (val as ApiObject)._embedded.serviceList;
            if (list === undefined) {
                list = (val as ApiObject)._embedded.applicationList;
            }
            stream.next(freezeObject(list as ApiObject));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }

    /**
     * Get a specific version of a service
     *
     * @param shortName unique short name of the service
     * @param version service version to be returned
     */
    getService(shortName, version): Observable<ApiObject> {

        const resource = 'services/' + shortName + '/' + version;
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            stream.next(freezeObject((val as ApiObject)));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }

    postService(data): Observable<Readonly<ApiObject>> {

        if (data == null) {
            return;
        }


        const resource = 'services/';

        return this.rest.post(resource, data).pipe(flatMap(val => {

            const stream = this.getStreamSource(val._links.self.href);
            stream.next(val);

            this.getServices();
            this.getServiceVersions(data.shortName);

            return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
                filter(service => service !== undefined)
            );
        }));

    }

    putService(shortName, version, data): Observable<Readonly<ApiObject>> {

        if (data == null) {
            return;
        }

        const resource = 'services/' + shortName + '/' + version;

        return this.rest.put(resource, data).pipe(flatMap(val => {

            const stream = this.getStreamSource(val._links.self.href);
            stream.next(val);
            console.log(val);

            return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
                filter(service => service !== undefined)
            );
        }));
    }

    /**
     * Get all services a specific service depends on.
     *
     * @param shortName unique short name of the service
     * @param version service version to be returned
     */
    getServiceDependees(shortName, version): Observable<ApiObject> {

        const resource = 'services/' + shortName + '/' + version + '/dependees';
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            stream.next(freezeObject((val._embedded.serviceList as ApiObject)));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }

    /**
     * Get all services depending on a specific service
     *
     * @param shortName unique short name of the service
     * @param version service version to be returned
     */
    getServiceDependers(shortName, version): Observable<ApiObject> {

        const resource = 'services/' + shortName + '/' + version + '/dependers';
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            stream.next(freezeObject((val as ApiObject)));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }

    getServiceInterfaces(shortName, version): Observable<ApiObject> {
        const resource = 'services/' + shortName + '/' + version + '/interfaces';
        const stream = this.getStreamSource(resource);

        this.rest.get(resource).subscribe(val => {
            stream.next(freezeObject((val as ApiObject)));
        });

        return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
            filter(data => data !== undefined)
        );
    }
}
