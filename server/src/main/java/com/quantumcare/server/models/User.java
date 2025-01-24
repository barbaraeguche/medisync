package com.quantumcare.server.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@Column(nullable = false)
	private String firstName, lastName;
	
	@Column(unique = true, nullable = false)
	private String email, phoneNumber;
	
	@Column(updatable = false, nullable = false)
	private LocalDate dateOfBirth;
	
 	@Column(updatable = false, nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@Embedded
	private Address address;
	@Embedded
	private EmergencyContact emergencyContact;
	
	// getters and setters
	public UUID getId() { return this.id; }
	public void setId(UUID id) {
		this.id = id;
	}
	
	public String getFirstName() { return this.firstName; }
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() { return this.lastName; }
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getEmail() { return this.email; }
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPhoneNumber() { return this.phoneNumber; }
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public LocalDate getDateOfBirth() { return this.dateOfBirth; }
	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	
	public Gender getGender() { return this.gender; }
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	
	public Role getRole() { return this.role; }
	public void setRole(Role role) {
		this.role = role;
	}
	
	public Address getAddress() { return this.address; }
	public void setAddress(Address address) {
		this.address = address;
	}
	
	public EmergencyContact getEmergencyContact() { return this.emergencyContact; }
	public void setEmergencyContact(EmergencyContact emergencyContact) {
		this.emergencyContact = emergencyContact;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum Gender { male, female; }
	public enum Role { doctor, nurse, patient; }
	
	@Embeddable
	public static class Address {
		private String street, city, province, postalCode, country;
		
		public String getStreet() { return this.street; }
		public void setStreet(String street) {
			this.street = street;
		}
		
		public String getCity() { return this.city; }
		public void setCity(String city) {
			this.city = city;
		}
		
		public String getProvince() { return this.province; }
		public void setProvince(String state) {
			this.province = state;
		}
		
		public String getPostalCode() { return this.postalCode; }
		public void setPostalCode(String zipCode) {
			this.postalCode = zipCode;
		}
		
		public String getCountry() { return this.country; }
		public void setCountry(String country) {
			this.country = country;
		}
	}
	@Embeddable
	public static class EmergencyContact {
		private String emergencyName, relationshipToUser, emergencyEmail;
		
		public String getEmergencyName() { return this.emergencyName; }
		public void setEmergencyName(String emergencyName) {
			this.emergencyName = emergencyName;
		}
		
		public String getRelationshipToUser() { return this.relationshipToUser; }
		public void setRelationshipToUser(String relationshipToUser) {
			this.relationshipToUser = relationshipToUser;
		}
		
		public String getEmergencyEmail() { return this.emergencyEmail; }
		public void setEmergencyEmail(String emergencyEmail) {
			this.emergencyEmail = emergencyEmail;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
