package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.delete.Education;
import com.quantumcare.server.models.helpers.Shift;
//import jakarta.persistence.*;

import java.util.Set;

//@Entity
//@Table(name = "nurse")
public class Nurse extends User {

//	@Column(nullable = false)
	private String specialization, licenseNumber; // make specialization a string of arrays
	
//	@ElementCollection
//	@CollectionTable(name = "education", joinColumns = @JoinColumn(name = "nurse_id"))
	Set<Education> education; // if i find a way to not allow duplicates, change here to list
	
//	@Column(nullable = false)
	private int yearsOfExperience;
	
//	@Column(nullable = false)
	private String department;
	
//	@Column(nullable = false)
//	@Enumerated(EnumType.STRING)
	Shift shift;
	
//	private String[] languages;
// 	private UUID supervisingDoctor;
}
