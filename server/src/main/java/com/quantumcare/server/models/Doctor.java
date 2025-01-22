package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.AvailableHours;
import com.quantumcare.server.models.helpers.Education;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "doctor")
public class Doctor extends User {
	
	@Column(nullable = false)
	private String specialization, licenseNumber; // make specialization a string of arrays
	
	@ElementCollection
	@CollectionTable(name = "education", joinColumns = @JoinColumn(name = "doctor_id"))
	Set<Education> education; // if i find a way to not allow duplicates, change here to list
	
	@Column(nullable = false)
	private int yearsOfExperience;
	
	@ElementCollection
	@CollectionTable(name = "availability", joinColumns = @JoinColumn(name = "doctor_id"))
	Set<AvailableHours> availableHours; // if i find a way to not allow duplicates, change here to list
	
	@Column(nullable = false)
	private String department;
	
//	private String[] languages;
}
