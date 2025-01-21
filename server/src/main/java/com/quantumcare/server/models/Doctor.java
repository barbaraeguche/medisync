package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Education;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "doctor")
public class Doctor extends User {
	
	@Column(nullable = false)
	private String specialization, licenseNumber;
	
	@ElementCollection
	@CollectionTable(name = "education", joinColumns = @JoinColumn(name = "doctor_id"))
	List<Education> education;
	
	private int yearsOfExperience;
	
	private String department;
}


// Doctor model
//export interface Doctor extends BaseUser {
//
//	availableHours: {
//		day: string
//		startTime: string
//		endTime: string
//	}[]

//	hospitalAffiliations: string[]
//	languages: string[]
