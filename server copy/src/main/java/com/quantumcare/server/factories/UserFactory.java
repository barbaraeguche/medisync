package com.quantumcare.server.factories;

import com.quantumcare.server.models.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserFactory {
	public User createUser(User reqUser) {
		return new User(
			reqUser.getFirstName(), reqUser.getLastName(), reqUser.getEmail(), reqUser.getPassword(), reqUser.getGender(),
			reqUser.getRole(), createAddress(reqUser), createEmergencyContact(reqUser)
		);
	}
	
	public User.Address createAddress(User reqUser) {
		return Optional.ofNullable(reqUser.getAddress())
			.map((address) -> new User.Address(
				address.getStreet(), address.getCity(), address.getPostalCode(), address.getCountry(), address.getProvince()
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
		BeanUtils.copyProperties(prevUser, currUser);
	}
	
	public void updateAddress(User prevUser, User currUser) {
		BeanUtils.copyProperties(prevUser.getAddress(), currUser.getAddress());
	}
	
	public void updateEmergencyContact(User prevUser, User currUser) {
		BeanUtils.copyProperties(prevUser.getEmergencyContact(), currUser.getEmergencyContact());
	}
}
