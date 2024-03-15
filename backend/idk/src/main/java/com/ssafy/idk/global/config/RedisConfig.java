package com.ssafy.idk.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        // Redis 단독 구성을 위한 RedisStandaloneConfiguration 객체 생성
        RedisStandaloneConfiguration redisConfiguration = new RedisStandaloneConfiguration();
        // 호스트 주소 설정
        redisConfiguration.setHostName(host);
        // 포트 설정
        redisConfiguration.setPort(port);
        // LettuceConnectionFactory를 사용하여 Redis 연결을 생성하고 반환
        return new LettuceConnectionFactory(redisConfiguration);
    }

    @Primary
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericToStringSerializer<>(Object.class));
        return redisTemplate;
    }
//    public RedisTemplate<String, Object> redisTemplate() {
//        // RedisTemplate 객체 생성
//        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
//        // 위에서 정의한 RedisConnectionFactory를 설정하여 연결 생성
//        redisTemplate.setConnectionFactory(redisConnectionFactory());
//        // Redis에서 사용될 Key Serializer를 설정 (String 형식으로 직렬화)
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        // Redis에서 사용될 Value Serializer를 설정 (String 형식으로 직렬화)
//        redisTemplate.setValueSerializer(new StringRedisSerializer());
//        // 생성된 RedisTemplate 반환
//        return redisTemplate;
//    }
}
