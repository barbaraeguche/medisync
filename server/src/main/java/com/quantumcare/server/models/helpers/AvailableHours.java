package com.quantumcare.server.models.helpers;

import jakarta.persistence.Embeddable;

import java.time.LocalDate;

@Embeddable
public class AvailableHours {
	
	private LocalDate date;
	private String startTime, endTime;
}
