package com.quantumcare.server.models;

import jakarta.persistence.*;
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
	private String firstName, lastName;
	
	@NonNull
	@Column(unique = true, nullable = false)
	private String email, phoneNumber;
	
	@NonNull
	@Column(updatable = false, nullable = false)
	private LocalDate dateOfBirth;
	
	@NonNull
	@Enumerated(EnumType.STRING)
 	@Column(updatable = false, nullable = false)
	private Gender gender;
	
	@NonNull
	@Enumerated(EnumType.STRING)
	@Column(updatable = false, nullable = false)
	private Role role;
	
	@NonNull
	@Embedded
	private Address address;
	
	@NonNull
	@Embedded
	private EmergencyContact emergencyContact;
	
	
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
