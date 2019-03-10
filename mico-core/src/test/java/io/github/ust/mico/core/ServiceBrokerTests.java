package io.github.ust.mico.core;

import io.github.ust.mico.core.broker.ServiceBroker;
import io.github.ust.mico.core.configuration.CorsConfig;
import io.github.ust.mico.core.model.MicoService;
import io.github.ust.mico.core.persistence.MicoServiceRepository;
import io.github.ust.mico.core.resource.ServiceResource;
import io.github.ust.mico.core.service.GitHubCrawler;
import io.github.ust.mico.core.service.MicoKubernetesClient;
import io.github.ust.mico.core.service.MicoStatusService;
import io.github.ust.mico.core.util.CollectionUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.OverrideAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.LinkedList;
import java.util.List;

import static io.github.ust.mico.core.TestConstants.*;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(ServiceResource.class)
@OverrideAutoConfiguration(enabled = true) //Needed to override our neo4j config
@EnableAutoConfiguration
@EnableConfigurationProperties(value = {CorsConfig.class})
public class ServiceBrokerTests {

    @MockBean
    private MicoServiceRepository serviceRepository;

    @MockBean
    private MicoStatusService micoStatusService;

    @MockBean
    private ServiceBroker serviceBroker;

    @MockBean
    private MicoKubernetesClient micoKubernetesClient;

    @MockBean
    private GitHubCrawler crawler;

    @Before
    public void setUp() throws Exception {
        MicoService micoServiceOne = new MicoService().setShortName(SHORT_NAME_1).setVersion(VERSION_1_0_1).setName(NAME_1).setDescription(DESCRIPTION_1);
        MicoService micoServiceTwo = new MicoService().setShortName(SHORT_NAME_2).setVersion(VERSION_1_0_2).setName(NAME_2).setDescription(DESCRIPTION_2);
        MicoService micoServiceThree = new MicoService().setShortName(SHORT_NAME_3).setVersion(VERSION_1_0_3).setName(NAME_3).setDescription(DESCRIPTION_3);

        List<MicoService> micoServiceList = new LinkedList<>();
        micoServiceList.add(micoServiceOne);
        micoServiceList.add(micoServiceTwo);
        micoServiceList.add(micoServiceThree);

        //when(serviceRepository.findAll()).thenReturn(micoServiceList);
        when(serviceBroker.getAllServicesAsList()).thenReturn(micoServiceList);
    }

    @Test
    public void getAllServicesAsList() throws Exception {
//        given(serviceRepository.findAll(ArgumentMatchers.anyInt())).willReturn(
//                CollectionUtils.listOf(
//                        new MicoService().setShortName(SHORT_NAME_1).setVersion(VERSION_1_0_1).setName(NAME_1).setDescription(DESCRIPTION_1),
//                        new MicoService().setShortName(SHORT_NAME_2).setVersion(VERSION_1_0_2).setName(NAME_2).setDescription(DESCRIPTION_2),
//                        new MicoService().setShortName(SHORT_NAME_3).setVersion(VERSION_1_0_3).setName(NAME_3).setDescription(DESCRIPTION_3)));

        List<MicoService> micoServiceList = serviceBroker.getAllServicesAsList();

        assertThat(micoServiceList.get(0).getShortName()).isEqualTo(SHORT_NAME_1);
        assertThat(micoServiceList.get(1).getShortName()).isEqualTo(SHORT_NAME_2);
        assertThat(micoServiceList.get(2).getShortName()).isEqualTo(SHORT_NAME_3);
    }


}
