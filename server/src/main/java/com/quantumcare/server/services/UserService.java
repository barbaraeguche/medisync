package com.quantumcare.server.services;

import com.quantumcare.server.models.User;
import com.quantumcare.server.models.factories.UserFactory;
import com.quantumcare.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
	
	private final UserRepository userRepository;
	private final UserFactory userFactory;
	
	@Autowired
	public UserService(UserRepository userRepository, UserFactory userFactory) {
		this.userRepository = userRepository;
		this.userFactory = userFactory;
	}
	
	public User getUserById(UUID id) {
		return userRepository.findById(id).orElse(null);
  }
	
	public void postUser(User reqUser) {
		User user = userFactory.createUser(reqUser);
		userRepository.save(user);
	}
	
	public void postAddress(User reqUser) {
		User user = userFactory.createUser(reqUser);
		userRepository.save(user);
	}
	public void postEmergencyContact(User reqUser) {
		User user = userFactory.createUser(reqUser);
		userRepository.save(user);
	}
	
	public void putUser(User prevUser, User currUser) {
		userFactory.updateUser(prevUser, currUser);
		userRepository.save(prevUser);
	}
	
	public void patchAddress(User prevUser, User currUser) {
    userFactory.updateAddress(prevUser, currUser);
    userRepository.save(prevUser);
  }
	public void patchEmergencyContact(User prevUser, User currUser) {
		userFactory.updateEmergencyContact(prevUser, currUser);
		userRepository.save(prevUser);
	}
	
	public void deleteUser(User reqUser) {
    userRepository.delete(reqUser);
  }
}
