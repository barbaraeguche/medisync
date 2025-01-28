package com.quantumcare.server.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Table(name = "\"user\"")
@NoArgsConstructor
@RequiredArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "First name cannot be empty")
	private String firstName;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Last name cannot be empty")
	private String lastName;
	
	@NonNull
	@Column(unique = true, nullable = false)
	@NotEmpty(message = "Email cannot be empty")
	private String email;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Password cannot be empty")
	private String password;
	
	@NonNull
	@Column(unique = true, nullable = false)
	@NotEmpty(message = "Phone number cannot be empty")
	private String phoneNumber;
	
	@NonNull
	@Column(updatable = false, nullable = false)
	@NotEmpty(message = "Date of birth cannot be empty")
	private LocalDate dateOfBirth;
	
	@NonNull
	@Enumerated(EnumType.STRING)
 	@Column(updatable = false, nullable = false)
	@NotEmpty(message = "Gender cannot be empty")
	private Gender gender;
	
	@NonNull
	@Enumerated(EnumType.STRING)
	@NotEmpty(message = "Role cannot be empty")
	@Column(updatable = false, nullable = false)
	private Role role;
	
	@NonNull
	@Embedded
	private Address address;
	
	@NonNull
	@Embedded
	private EmergencyContact emergencyContact;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Doctor doctor;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Nurse nurse;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Patient patient;
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum Gender { male, female }
	public enum Role { doctor, nurse, patient }
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Address {
		private String street, city, province, postalCode, country;
	}
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class EmergencyContact {
		private String contactName, relationshipToUser, contactEmail;
	}
	// ---------------------- END HELPERS ---------------------- //
}
