package com.quantumcare.server.models;

import jakarta.annotation.Nullable;
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
	
	private LocalDate dateOfBirth;
	
	@Enumerated(EnumType.STRING)
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
		@Column(columnDefinition = "default \"\"")
		private String street, city, province, postalCode, country;
	}
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class EmergencyContact {
		@Column(name = "contact_name")
		private String name;
		
		private String relationship;
		
		@Column(name = "contact_email")
		private String email;
	}
	// ---------------------- END HELPERS ---------------------- //
}
