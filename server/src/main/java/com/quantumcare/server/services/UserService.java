package com.quantumcare.server.services;

import com.quantumcare.server.models.User;
import com.quantumcare.server.factories.UserFactory;
import com.quantumcare.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
	
	private final UserFactory userFactory;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	public UserService(UserFactory userFactory, UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userFactory = userFactory;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
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
	
	public User postUser(User reqUser) {
		User user = userFactory.createUser(reqUser);
		return userRepository.save(user);
	}
	
	public User putUser(User prevUser, User currUser) {
		userFactory.updateUser(prevUser, currUser);
		return userRepository.save(prevUser);
	}
	
	public void putPassword(User prevUser, String password) {
		prevUser.setPassword(passwordEncoder.encode(password));
		userRepository.save(prevUser);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user;
		
		// check if username is a UUID or an email address
		try {
			user = getUserById(UUID.fromString(username));
		} catch (IllegalArgumentException e) {
			user = findUserByEmail(username); // not a UUID, so treat as email
		}
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		
		return new org.springframework.security.core.userdetails.User(
			user.get_id().toString(),
			user.getPassword(),
			Collections.singletonList(new SimpleGrantedAuthority(user.getRole().toString()))
		);
	}
}
