.. java:import:: java.util List

.. java:import:: java.util.stream Collectors

.. java:import:: javax.validation Valid

.. java:import:: org.springframework.beans.factory.annotation Autowired

.. java:import:: org.springframework.hateoas MediaTypes

.. java:import:: org.springframework.hateoas Resource

.. java:import:: org.springframework.hateoas Resources

.. java:import:: org.springframework.http HttpStatus

.. java:import:: org.springframework.http ResponseEntity

.. java:import:: org.springframework.web.server ResponseStatusException

.. java:import:: io.github.ust.mico.core.broker MicoApplicationBroker

.. java:import:: io.github.ust.mico.core.dto.request MicoApplicationRequestDTO

.. java:import:: io.github.ust.mico.core.dto.request MicoServiceDeploymentInfoRequestDTO

.. java:import:: io.github.ust.mico.core.dto.request MicoVersionRequestDTO

.. java:import:: io.github.ust.mico.core.dto.response MicoApplicationWithServicesResponseDTO

.. java:import:: io.github.ust.mico.core.dto.response MicoServiceDeploymentInfoResponseDTO

.. java:import:: io.github.ust.mico.core.dto.response MicoServiceResponseDTO

.. java:import:: io.github.ust.mico.core.dto.response.status MicoApplicationDeploymentStatusResponseDTO

.. java:import:: io.github.ust.mico.core.dto.response.status MicoApplicationStatusResponseDTO

.. java:import:: io.github.ust.mico.core.model MicoApplication

.. java:import:: io.github.ust.mico.core.model MicoService

.. java:import:: io.github.ust.mico.core.model MicoServiceDeploymentInfo

.. java:import:: io.swagger.annotations ApiOperation

ApplicationResource
===================

.. java:package:: io.github.ust.mico.core.resource
   :noindex:

.. java:type:: @RestController @RequestMapping public class ApplicationResource

Methods
-------
addServiceToApplication
^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @ApiOperation @PostMapping public ResponseEntity<Void> addServiceToApplication(String applicationShortName, String applicationVersion, String serviceShortName, String serviceVersion)
   :outertype: ApplicationResource

createApplication
^^^^^^^^^^^^^^^^^

.. java:method:: @PostMapping public ResponseEntity<Resource<MicoApplicationWithServicesResponseDTO>> createApplication(MicoApplicationRequestDTO applicationDto)
   :outertype: ApplicationResource

deleteAllVersionsOfAnApplication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @DeleteMapping public ResponseEntity<Void> deleteAllVersionsOfAnApplication(String shortName)
   :outertype: ApplicationResource

deleteApplication
^^^^^^^^^^^^^^^^^

.. java:method:: @DeleteMapping public ResponseEntity<Void> deleteApplication(String shortName, String version)
   :outertype: ApplicationResource

deleteServiceFromApplication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @DeleteMapping public ResponseEntity<Void> deleteServiceFromApplication(String shortName, String version, String serviceShortName)
   :outertype: ApplicationResource

getAllApplications
^^^^^^^^^^^^^^^^^^

.. java:method:: @GetMapping public ResponseEntity<Resources<Resource<MicoApplicationWithServicesResponseDTO>>> getAllApplications()
   :outertype: ApplicationResource

getApplicationByShortNameAndVersion
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @GetMapping public ResponseEntity<Resource<MicoApplicationWithServicesResponseDTO>> getApplicationByShortNameAndVersion(String shortName, String version)
   :outertype: ApplicationResource

getApplicationDeploymentStatus
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @GetMapping public ResponseEntity<Resource<MicoApplicationDeploymentStatusResponseDTO>> getApplicationDeploymentStatus(String shortName, String version)
   :outertype: ApplicationResource

getApplicationsByShortName
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @GetMapping public ResponseEntity<Resources<Resource<MicoApplicationWithServicesResponseDTO>>> getApplicationsByShortName(String shortName)
   :outertype: ApplicationResource

getServiceDeploymentInformation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @GetMapping public ResponseEntity<Resource<MicoServiceDeploymentInfoResponseDTO>> getServiceDeploymentInformation(String shortName, String version, String serviceShortName)
   :outertype: ApplicationResource

getServicesFromApplication
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @GetMapping public ResponseEntity<Resources<Resource<MicoServiceResponseDTO>>> getServicesFromApplication(String shortName, String version)
   :outertype: ApplicationResource

getStatusOfApplication
^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @GetMapping public ResponseEntity<Resource<MicoApplicationStatusResponseDTO>> getStatusOfApplication(String shortName, String version)
   :outertype: ApplicationResource

promoteApplication
^^^^^^^^^^^^^^^^^^

.. java:method:: @PostMapping public ResponseEntity<Resource<MicoApplicationWithServicesResponseDTO>> promoteApplication(String shortName, String version, MicoVersionRequestDTO newVersionDto)
   :outertype: ApplicationResource

updateApplication
^^^^^^^^^^^^^^^^^

.. java:method:: @PutMapping public ResponseEntity<Resource<MicoApplicationWithServicesResponseDTO>> updateApplication(String shortName, String version, MicoApplicationRequestDTO applicationRequestDto)
   :outertype: ApplicationResource

updateServiceDeploymentInformation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @PutMapping public ResponseEntity<Resource<MicoServiceDeploymentInfoResponseDTO>> updateServiceDeploymentInformation(String shortName, String version, String serviceShortName, MicoServiceDeploymentInfoRequestDTO serviceDeploymentInfoRequestDto)
   :outertype: ApplicationResource

