package com.agrodig.usersservice;

import com.agrodig.usersservice.controller.UserController;
import com.agrodig.usersservice.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@EnableEurekaClient
@ComponentScan("com.agrodig.usersservice.repository")
@ComponentScan("com.agrodig.usersservice.controller")
@ComponentScan(basePackageClasses = UserRepository.class)
public class UsersServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UsersServiceApplication.class, args);
    }

}