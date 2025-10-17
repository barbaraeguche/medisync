package com.medisync.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MediSync {
	public static void main(String[] args) {
		SpringApplication.run(MediSync.class, args);
	}
}
