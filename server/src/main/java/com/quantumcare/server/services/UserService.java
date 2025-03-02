package com.quantumcare.server.services;

import com.quantumcare.server.models.User;
import com.quantumcare.server.factories.UserFactory;
import com.quantumcare.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
	
	private final UserFactory userFactory;
	private final UserRepository userRepository;
	
	@Autowired
	public UserService(UserFactory userFactory, UserRepository userRepository) {
		this.userFactory = userFactory;
		this.userRepository = userRepository;
	}
	
	public User getUserById(UUID id) {
		return userRepository.findById(id).orElse(null);
  }
	
	// for authentication
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	public void postUser(User reqUser) {
		User user = userFactory.createUser(reqUser);
		userRepository.save(user);
	}
	
	public void putUser(User prevUser, User currUser) {
		userFactory.updateUser(prevUser, currUser);
		userRepository.save(prevUser);
	}
	
	public void deleteUser(User reqUser) {
    userRepository.delete(reqUser);
  }
}
