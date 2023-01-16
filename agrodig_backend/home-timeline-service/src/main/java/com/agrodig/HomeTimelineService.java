package com.agrodig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class HomeTimelineService {
    public static void main(String[] args) {
        SpringApplication.run(HomeTimelineService.class, args);

    }
}
