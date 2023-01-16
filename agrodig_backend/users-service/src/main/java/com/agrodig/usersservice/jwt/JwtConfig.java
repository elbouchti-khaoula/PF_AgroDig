package com.agrodig.usersservice.jwt;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@Data
@EnableConfigurationProperties(JwtConfig.class)
@ConfigurationProperties(prefix ="jwt")
public class JwtConfig {
    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpirationAfterDays;
}
