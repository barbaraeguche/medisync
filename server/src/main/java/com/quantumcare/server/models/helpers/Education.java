package com.quantumcare.server.models.helpers;

import jakarta.persistence.Embeddable;

@Embeddable
public class Education {
	
	private String degree, institution;
	private int yearOfGraduation;
}
