.. java:import:: java.util List

.. java:import:: java.util Optional

.. java:import:: org.springframework.data.neo4j.annotation Query

.. java:import:: org.springframework.data.neo4j.repository Neo4jRepository

.. java:import:: org.springframework.data.repository.query Param

.. java:import:: io.github.ust.mico.core.model MicoApplication

.. java:import:: io.github.ust.mico.core.model MicoService

.. java:import:: io.github.ust.mico.core.model MicoServiceDeploymentInfo

MicoServiceDeploymentInfoRepository
===================================

.. java:package:: io.github.ust.mico.core.persistence
   :noindex:

.. java:type:: public interface MicoServiceDeploymentInfoRepository extends Neo4jRepository<MicoServiceDeploymentInfo, Long>

Methods
-------
deleteAllByApplication
^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @Query  void deleteAllByApplication(String applicationShortName)
   :outertype: MicoServiceDeploymentInfoRepository

   Deletes all deployment information for all versions of an application. All additional properties of a \ :java:ref:`MicoServiceDeploymentInfo`\  that are stored as a separate node entity and connected to it via a \ ``[:HAS]``\  relationship will be deleted, too.

   :param applicationShortName: the short name of the \ :java:ref:`MicoApplication`\ .

deleteAllByApplication
^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @Query  void deleteAllByApplication(String applicationShortName, String applicationVersion)
   :outertype: MicoServiceDeploymentInfoRepository

   Deletes all deployment information for a particular application. All additional properties of a \ :java:ref:`MicoServiceDeploymentInfo`\  that are stored as a separate node entity and connected to it via a \ ``[:HAS]``\  relationship will be deleted, too.

   :param applicationShortName: the short name of the \ :java:ref:`MicoApplication`\ .
   :param applicationVersion: the version of the \ :java:ref:`MicoApplication`\ .

deleteByApplicationAndService
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @Query  void deleteByApplicationAndService(String applicationShortName, String applicationVersion, String serviceShortName)
   :outertype: MicoServiceDeploymentInfoRepository

   Deletes the deployment information for a particular application and service. All additional properties of a \ :java:ref:`MicoServiceDeploymentInfo`\  that are stored as a separate node entity and connected to it via a \ ``[:HAS]``\  relationship will be deleted, too.

   :param applicationShortName: the short name of the \ :java:ref:`MicoApplication`\ .
   :param applicationVersion: the version of the \ :java:ref:`MicoApplication`\ .
   :param serviceShortName: the short name of the \ :java:ref:`MicoService`\ .

deleteByApplicationAndService
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @Query  void deleteByApplicationAndService(String applicationShortName, String applicationVersion, String serviceShortName, String serviceVersion)
   :outertype: MicoServiceDeploymentInfoRepository

   Deletes the deployment information for a particular application and service. All additional properties of a \ :java:ref:`MicoServiceDeploymentInfo`\  that are stored as a separate node entity and connected to it via a \ ``[:HAS]``\  relationship will be deleted, too.

   :param applicationShortName: the short name of the \ :java:ref:`MicoApplication`\ .
   :param applicationVersion: the version of the \ :java:ref:`MicoApplication`\ .
   :param serviceShortName: the short name of the \ :java:ref:`MicoService`\ .
   :param serviceVersion: the version of the \ :java:ref:`MicoService`\ .

findAllByApplication
^^^^^^^^^^^^^^^^^^^^

.. java:method:: @Query  List<MicoServiceDeploymentInfo> findAllByApplication(String applicationShortName, String applicationVersion)
   :outertype: MicoServiceDeploymentInfoRepository

   Retrieves all service deployment information of a particular application.

   :param applicationShortName: the short name of the \ :java:ref:`MicoApplication`\ .
   :param applicationVersion: the version of the \ :java:ref:`MicoApplication`\ .
   :return: a \ :java:ref:`List`\  of \ :java:ref:`MicoServiceDeploymentInfo`\  instances.

findAllByService
^^^^^^^^^^^^^^^^

.. java:method:: @Query  List<MicoServiceDeploymentInfo> findAllByService(String serviceShortName, String serviceVersion)
   :outertype: MicoServiceDeploymentInfoRepository

   Retrieves all service deployment information of a service. Note that one service can be used by (included in) multiple applications.

   :param serviceShortName: the short name of the \ :java:ref:`MicoService`\ .
   :param serviceVersion: the version of the \ :java:ref:`MicoService`\ .
   :return: a \ :java:ref:`List`\  of \ :java:ref:`MicoServiceDeploymentInfo`\  instances.

findByApplicationAndService
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @Query  Optional<MicoServiceDeploymentInfo> findByApplicationAndService(String applicationShortName, String applicationVersion, String serviceShortName)
   :outertype: MicoServiceDeploymentInfoRepository

   Retrieves the deployment information for a particular application and service.

   :param applicationShortName: the short name of the \ :java:ref:`MicoApplication`\ .
   :param applicationVersion: the version of the \ :java:ref:`MicoApplication`\ .
   :param serviceShortName: the short name of the \ :java:ref:`MicoService`\ .
   :return: an \ :java:ref:`Optional`\  of \ :java:ref:`MicoServiceDeploymentInfo`\ .

findByApplicationAndService
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. java:method:: @Query  Optional<MicoServiceDeploymentInfo> findByApplicationAndService(String applicationShortName, String applicationVersion, String serviceShortName, String serviceVersion)
   :outertype: MicoServiceDeploymentInfoRepository

   Retrieves the deployment information for a particular application and service.

   :param applicationShortName: the short name of the \ :java:ref:`MicoApplication`\ .
   :param applicationVersion: the version of the \ :java:ref:`MicoApplication`\ .
   :param serviceShortName: the short name of the \ :java:ref:`MicoService`\ .
   :param serviceVersion: the version of the \ :java:ref:`MicoService`\ .
   :return: an \ :java:ref:`Optional`\  of \ :java:ref:`MicoServiceDeploymentInfo`\ .

