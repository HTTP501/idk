package com.ssafy.ca;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.security.Security;

@SpringBootApplication
public class CaApplication {
//	static {
//		Security.addProvider(new BouncyCastleProvider());
//	}

	public static void main(String[] args) {
//		Security.addProvider(new BouncyCastleProvider());
		SpringApplication.run(CaApplication.class, args);
	}

}
