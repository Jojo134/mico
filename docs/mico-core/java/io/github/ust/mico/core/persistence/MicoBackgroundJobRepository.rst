.. java:import:: io.github.ust.mico.core.model MicoServiceBackgroundJob

.. java:import:: org.springframework.data.repository CrudRepository

.. java:import:: org.springframework.stereotype Repository

.. java:import:: java.util List

.. java:import:: java.util Optional

MicoBackgroundJobRepository
===========================

.. java:package:: io.github.ust.mico.core.persistence
   :noindex:

.. java:type:: @Repository public interface MicoBackgroundJobRepository extends CrudRepository<MicoServiceBackgroundJob, String>

Methods
-------
findAll
^^^^^^^

.. java:method:: @Override  List<MicoServiceBackgroundJob> findAll()
   :outertype: MicoBackgroundJobRepository

findByServiceShortNameAndServiceVersion
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method::  List<MicoServiceBackgroundJob> findByServiceShortNameAndServiceVersion(String micoServiceShortName, String micoServiceVersion)
   :outertype: MicoBackgroundJobRepository

findByServiceShortNameAndServiceVersionAndType
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method::  Optional<MicoServiceBackgroundJob> findByServiceShortNameAndServiceVersionAndType(String micoServiceShortName, String micoServiceVersion, MicoServiceBackgroundJob.Type type)
   :outertype: MicoBackgroundJobRepository

