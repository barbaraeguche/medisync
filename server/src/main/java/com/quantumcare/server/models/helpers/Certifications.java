package com.quantumcare.server.models.helpers;

import jakarta.persistence.Embeddable;

import java.time.LocalDate;

@Embeddable
public class Certifications {
	
	private String name, issuingBody;
	private LocalDate expirationDate;
}
