package com.quantumcare.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "patient")
public class Patient extends User {
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