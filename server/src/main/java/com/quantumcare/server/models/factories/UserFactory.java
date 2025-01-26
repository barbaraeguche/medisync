package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class UserFactory {
  public User createUser(String firstName, String lastName, String email, String phoneNumber, LocalDate dateOfBirth,
												 User.Gender gender, User.Role role, User.Address address, User.EmergencyContact emergencyContact
	) {
		return new User(firstName, lastName, email, phoneNumber, dateOfBirth, gender, role, address, emergencyContact);
	}
	
	public User.Address createAddress(String street, String city, String province, String postalCode, String country) {
		return new User.Address(street, city, province, postalCode, country);
	}
	
	public User.EmergencyContact createEmergencyContact(String contactName, String relationshipToUser, String contactEmail) {
    return new User.EmergencyContact(contactName, relationshipToUser, contactEmail);
  }
}
