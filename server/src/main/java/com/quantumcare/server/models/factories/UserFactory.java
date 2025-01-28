package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class UserFactory {
	// create a new instance
  public User createUser(User reqUser) {
		return new User(
			reqUser.getFirstName(), reqUser.getLastName(), reqUser.getEmail(), reqUser.getPassword(), reqUser.getPhoneNumber(),
			reqUser.getDateOfBirth(), reqUser.getGender(), reqUser.getRole(), createAddress(reqUser), createEmergencyContact(reqUser)
		);
	}
	
	public User.Address createAddress(User reqUser) {
		User.Address address = reqUser.getAddress();
		return new User.Address(
      address.getStreet(), address.getCity(), address.getProvince(), address.getPostalCode(), address.getCountry()
    );
	}
	
	public User.EmergencyContact createEmergencyContact(User reqUser) {
		User.EmergencyContact emergencyContact = reqUser.getEmergencyContact();
    return new User.EmergencyContact(
			emergencyContact.getContactName(), emergencyContact.getRelationshipToUser(), emergencyContact.getContactEmail()
		);
  }
	
	// update instance
	public void updateUser(User prevUser, User currUser) {
		prevUser.setFirstName(currUser.getFirstName());
		prevUser.setLastName(currUser.getLastName());
		prevUser.setPhoneNumber(currUser.getPhoneNumber());
		
		// update address and emergency contact
		updateAddress(prevUser, currUser);
		updateEmergencyContact(prevUser, currUser);
	}
	
	public void updateAddress(User prevUser, User currUser) {
		User.Address prevAddress = prevUser.getAddress();
		User.Address currAddress = currUser.getAddress();
		
		prevAddress.setStreet(currAddress.getStreet());
		prevAddress.setCity(currAddress.getCity());
		prevAddress.setProvince(currAddress.getProvince());
		prevAddress.setPostalCode(currAddress.getPostalCode());
		prevAddress.setCountry(currAddress.getCountry());
	}
	
	public void updateEmergencyContact(User prevUser, User currUser) {
		User.EmergencyContact prevEmergencyContact = prevUser.getEmergencyContact();
		User.EmergencyContact currEmergencyContact = currUser.getEmergencyContact();
		
		prevEmergencyContact.setContactName(currEmergencyContact.getContactName());
		prevEmergencyContact.setRelationshipToUser(currEmergencyContact.getRelationshipToUser());
		prevEmergencyContact.setContactEmail(currEmergencyContact.getContactEmail());
	}
}
