package com.quantumcare.server.models;

//import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

//@Entity
//@Table(name = "user")
//@Inheritance(strategy = InheritanceType.JOINED)
public class User {
	
//	@Id
//	@GeneratedValue(strategy = GenerationType.UUID)
//	@Column(updatable = false, nullable = false)
	private UUID id;
	
//	@Column(nullable = false)
	private String firstName, lastName;
	
//	@Column(unique = true, nullable = false)
	private String email, phoneNumber;
	
//	@Column(updatable = false, nullable = false)
	private LocalDate dateOfBirth;
	
//	@Column(nullable = false)
//	@Enumerated(EnumType.STRING)
	private Gender gender;
	
//	@Column(nullable = false)
//	@Enumerated(EnumType.STRING)
	private Role role;
	
//	@Embedded
	private Address address;
//	@Embedded
	private EmergencyContact emergencyContact;
	
	
	// ------------------------ HELPERS ------------------------ //
	// enums
	private enum Gender {
		male, female;
	}
	private enum Role {
		doctor, nurse, patient;
	}
	
	// inner classes
	private static class Address {
		private String street, city, state, zipCode, country;
		
		public String getStreet() { return this.street; }
		public void setStreet(String street) {
			this.street = street;
		}
		
		public String getCity() { return this.city; }
		public void setCity(String city) {
			this.city = city;
		}
		
		public String getState() { return this.state; }
		public void setState(String state) {
			this.state = state;
		}
		
		public String getZipCode() { return this.zipCode; }
		public void setZipCode(String zipCode) {
			this.zipCode = zipCode;
		}
		
		public String getCountry() { return this.country; }
		public void setCountry(String country) {
			this.country = country;
		}
	}
	private static class EmergencyContact {
		private String name, relationship, email;
		
		public String getName() { return this.name; }
		public void setName(String name) {
			this.name = name;
		}
		
		public String getRelationship() { return this.relationship; }
		public void setRelationship(String relationship) {
			this.relationship = relationship;
		}
		
		public String getEmail() { return this.email; }
		public void setEmail(String email) {
			this.email = email;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
