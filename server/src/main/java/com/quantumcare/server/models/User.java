package com.quantumcare.server.models;

import jakarta.persistence.*;
import com.quantumcare.server.models.helpers.Gender;
import com.quantumcare.server.models.helpers.Role;
import com.quantumcare.server.models.helpers.Address;
import com.quantumcare.server.models.helpers.EmergencyContact;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(updatable = false, nullable = false)
	private UUID id;
	
	@Column(nullable = false)
	private String firstName, lastName;
	
	@Column(unique = true, nullable = false)
	private String email, phoneNumber;
	
	@Column(nullable = false)
	private LocalDate dateOfBirth;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@Embedded
	private Address address;
	@Embedded
	private EmergencyContact emergencyContact;
}
