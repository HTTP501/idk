package com.ssafy.idk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class IdkApplication {

	public static void main(String[] args) {
		SpringApplication.run(IdkApplication.class, args);
	}

}
