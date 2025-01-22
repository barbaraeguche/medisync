package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.MedicalProfessional;
//import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

//@Entity
//@Table(name = "doctor")
public class Doctor extends User {
	
	// join on doctorId foreign key
	MedicalProfessional medicalProfessional;
	
//	@Embedded
	Set<AvailableHours> availableHours;
	
//	@Column(nullable = false)
	private List<String> languages;
	
	
	// ------------------------ HELPERS ------------------------ //
	// inner class
	private static class AvailableHours {
		private LocalDate day;
		private LocalTime startTime, endTime;
		
		public LocalDate getDay() { return this.day; }
		public void setDay(LocalDate day) {
			this.day = day;
		}
		
		public LocalTime getStartTime() { return this.startTime; }
		public void setStartTime(LocalTime startTime) {
			this.startTime = startTime;
		}
		
		public LocalTime getEndTime() { return this.endTime; }
		public void setEndTime(LocalTime endTime) {
			this.endTime = endTime;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
