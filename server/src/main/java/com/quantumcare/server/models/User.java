package com.quantumcare.server.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
	@NotEmpty(message = "First name must be provided")
	private String firstName;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Last name must be provided")
	private String lastName;
	
	@NonNull
	@Column(unique = true, nullable = false)
	@NotEmpty(message = "Email must be provided")
	private String email;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Password must be provided")
	private String password;
	
	@NonNull
	@Column(unique = true, nullable = false)
	@NotEmpty(message = "Phone number must be provided")
	private String phoneNumber;
	
	@NonNull
	@Column(updatable = false, nullable = false)
	@NotNull(message = "Date of birth must be provided")
	private LocalDate dateOfBirth;
	
	@NonNull
	@Enumerated(EnumType.STRING)
 	@Column(updatable = false, nullable = false)
	@NotNull(message = "Gender must be specified")
	private Gender gender;
	
	@NonNull
	@Enumerated(EnumType.STRING)
	@NotNull(message = "Role must be specified")
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
