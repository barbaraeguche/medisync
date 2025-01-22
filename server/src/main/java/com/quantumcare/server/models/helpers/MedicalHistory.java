package com.quantumcare.server.models.helpers;

import jakarta.persistence.Embeddable;

import java.time.LocalDate;

@Embeddable
public class MedicalHistory {
	
	private String condition;
	private LocalDate diagnosisDate;
	private String[] medications;
}
