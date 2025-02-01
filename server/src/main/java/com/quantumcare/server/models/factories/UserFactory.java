package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserFactory {
	public User createUser(User reqUser) {
		return new User(
			reqUser.getFirstName(), reqUser.getLastName(), reqUser.getEmail(), reqUser.getPassword(), reqUser.getRole(),
			createAddress(reqUser), createEmergencyContact(reqUser)
		);
	}
	
	public User.Address createAddress(User reqUser) {
		return Optional.ofNullable(reqUser.getAddress())
			.map((address) -> new User.Address(
					address.getStreet(), address.getCity(), address.getProvince(), address.getPostalCode(), address.getCountry()
				))
			.orElse(new User.Address());
	}
	
	public User.EmergencyContact createEmergencyContact(User reqUser) {
		return Optional.ofNullable(reqUser.getEmergencyContact())
			.map((emergencyContact) -> new User.EmergencyContact(
				emergencyContact.getName(), emergencyContact.getRelationship(), emergencyContact.getEmail()
			))
			.orElse(new User.EmergencyContact());
  }
	
	// ---------------------------------------------------------------- //
	
	public void updateUser(User prevUser, User currUser) {
		prevUser.setFirstName(currUser.getFirstName());
		prevUser.setLastName(currUser.getLastName());
		prevUser.setDateOfBirth(currUser.getDateOfBirth());
		prevUser.setGender(currUser.getGender());
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
		
		prevEmergencyContact.setName(currEmergencyContact.getName());
		prevEmergencyContact.setRelationship(currEmergencyContact.getRelationship());
		prevEmergencyContact.setEmail(currEmergencyContact.getEmail());
	}
}
