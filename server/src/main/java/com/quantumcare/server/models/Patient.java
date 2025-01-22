package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.BloodType;
import com.quantumcare.server.models.helpers.MedicalHistory;
//import jakarta.persistence.*;

import java.util.List;

//@Entity
//@Table(name = "patient")
public class Patient extends User {
	
//	@ElementCollection
//	@CollectionTable(name = "education", joinColumns = @JoinColumn(name = "doctor_id"))
  private List<MedicalHistory> medicalHistory; // if i find a way to not allow duplicates, change here to list
	
//	private String[] allergies;
	
//	@Column(nullable = false)
	BloodType bloodType;
	
	private String insuranceProvider, insurancePolicyNumber;
}


// Patient model
//export interface Patient extends BaseUser {
//	medicalHistory: {
//		condition: string
//		diagnosisDate: Date
//		medications: string[]
//	}[]
//	allergies: string[]
//	bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
//	insuranceProvider: string
//	insurancePolicyNumber: string
//	primaryCarePhysician: string // Doctor's ID
//	upcomingAppointments: string[] // Array of appointment IDs
//	pastAppointments: string[] // Array of appointment IDs
//	medications: {
//		name: string
//		dosage: string
//		frequency: string
//	}[]
//	healthMetrics: {
//		height: number // in cm
//		weight: number // in kg
//		bloodPressure: string
//		bloodSugar: number
//	}
//}