package com.quantumcare.server.services;

import com.quantumcare.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	private final UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
  }
}


//	@PostMapping
//	public User setUsers(@RequestBody User reqUser) {
//		User.Address address = userFactory.createAddress(
//			reqUser.getAddress().getStreet(), reqUser.getAddress().getCity(), reqUser.getAddress().getProvince(), reqUser.getAddress().getPostalCode(), reqUser.getAddress().getCountry()
//		);
//		User.EmergencyContact emergencyContact = userFactory.createEmergencyContact(
//			reqUser.getEmergencyContact().getContactName(), reqUser.getEmergencyContact().getRelationshipToUser(), reqUser.getEmergencyContact().getContactEmail()
//		);
//		User user = userFactory.createUser(
//			reqUser.getFirstName(), reqUser.getLastName(), reqUser.getEmail(), reqUser.getPhoneNumber(), reqUser.getDateOfBirth(), reqUser.getGender(), reqUser.getRole(), address, emergencyContact
//		);
//		return userRepository.save(user);
//	}