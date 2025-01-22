package com.quantumcare.server.models;

//import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

//@Entity
//@Table(name = "patient")
public class Patient extends User {
	
	private List<MedicalHistory> medicalHistory;
	List<String> allergies;
	
//	@Column(nullable = false)
	BloodType bloodType;
	
	String insuranceProvider, insurancePolicyNumber;

//	Appointments pastAppointments => date < now
//	Appointments upcomingAppointments => date > now

//	Medications medications => nullable

//	@Column(nullable = false)
//	@Embedded
	HealthMetrics healthMetrics;
	
	
	// ------------------------ HELPERS ------------------------ //
	// enum
	private enum BloodType {
		a_plus("A+"), a_minus("A-"), b_plus("B+"), b_minus("B-"),
		ab_plus("AB+"), ab_minus("AB-"), o_plus("O+"), o_minus("O-");
		
		private final String bloodType;
		
		BloodType(String bloodType) { this.bloodType = bloodType; }
		public String displayBloodType() { return this.bloodType; }
	}
	
	// inner classes
	private static class MedicalHistory {
		private String condition;
		private LocalDate diagnosisDate;
		private List<String> medications;
		
		public String getCondition() { return this.condition; }
		public void setCondition(String condition) {
			this.condition = condition;
		}
		
		public LocalDate getDiagnosisDate() { return this.diagnosisDate; }
		public void setDiagnosisDate(LocalDate diagnosisDate) {
			this.diagnosisDate = diagnosisDate;
		}
		
		public List<String> getMedications() { return this.medications; }
		public void setMedications(List<String> medications) {
			this.medications = medications;
		}
	}
	private static class HealthMetrics {
		private long height, weight;
		private String bloodPressure;
		private long bloodSugar;
		
		public long getHeight() { return height; }
		public void setHeight(long height) {
			this.height = height;
		}
		
		public long getWeight() { return weight; }
		public void setWeight(long weight) {
			this.weight = weight;
		}
		
		public String getBloodPressure() { return bloodPressure; }
		public void setBloodPressure(String bloodPressure) {
			this.bloodPressure = bloodPressure;
		}
		
		public long getBloodSugar() { return bloodSugar; }
		public void setBloodSugar(long bloodSugar) {
			this.bloodSugar = bloodSugar;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
