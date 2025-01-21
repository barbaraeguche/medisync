package com.quantumcare.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "nurse")
public class Nurse extends User {
}


// Nurse model
//export interface Nurse extends BaseUser {
//	licenseNumber: string
//	specialization: string[]
//	education: {
//		degree: string
//		institution: string
//		yearOfGraduation: number
//	}[]
//	yearsOfExperience: number
//	department: string
//	shift: "day" | "night" | "rotating"
//	certifications: {
//		name: string
//		issuingBody: string
//		expirationDate: Date
//	}[]
//	languages: string[]
//	supervisingDoctor: string // Doctor's ID
//}
