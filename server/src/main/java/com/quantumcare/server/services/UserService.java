package com.quantumcare.server.services;

import com.quantumcare.server.models.User;
import com.quantumcare.server.factories.UserFactory;
import com.quantumcare.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
	
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
	
	public User putUser(User prevUser, User currUser) {
		userFactory.updateUser(prevUser, currUser);
		return userRepository.save(prevUser);
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) {
		User user = findUserByEmail(email);
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found with email: " + email);
		}
		
		return new org.springframework.security.core.userdetails.User(
			user.getEmail(),
			user.getPassword(),
			Collections.singletonList(new SimpleGrantedAuthority(user.getRole().toString()))
		);
	}
}
