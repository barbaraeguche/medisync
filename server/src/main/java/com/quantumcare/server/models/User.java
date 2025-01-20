package com.quantumcare.server.models;

import jakarta.persistence.*;
import com.quantumcare.server.models.helpers.Gender;
import com.quantumcare.server.models.helpers.Address;
import com.quantumcare.server.models.helpers.EmergencyContact;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(updatable = false, nullable = false)
	private UUID id;
	
	private String name;
	
	@Column(unique = true)
	private String email, phoneNumber;
	
	private LocalDate dateOfBirth;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Embedded
	private Address address;
	@Embedded
	private EmergencyContact emergencyContact;
}
