package com.quantumcare.server.models.helpers.delete;

//import jakarta.persistence.*;

import java.time.LocalDate;

//@Embeddable
public class AvailableHours {
	
	private LocalDate date;
	private String startTime, endTime;
}
