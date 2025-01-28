package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.UserNotFound;
import com.quantumcare.server.models.User;
import com.quantumcare.server.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
    this.userService = userService;
	}
	
	@GetMapping("/{userId}")
	public User getUser(@PathVariable UUID userId) {
		// if not id is sent or id does not exist in database, send a 404 error
		validateUserId(userId);
		
		// return found doctor
		return userService.getUserById(userId);
	}
	
	@PostMapping
	public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
		try {
			userService.postUser(user);
			return ResponseEntity.ok("User created successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to create user: " + exp.getMessage());
		}
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<String> replaceDoctor(@PathVariable UUID userId, @Valid @RequestBody User user) {
		try {
			User currUser = getUser(userId);
			userService.putUser(currUser, user);
			return ResponseEntity.ok("User updated successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update user: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<String> deleteDoctor(@PathVariable UUID userId) {
		try {
			User currUser = getUser(userId);
			userService.deleteUser(currUser);
			return ResponseEntity.ok("User deleted successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to delete user: " + exp.getMessage());
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given user ID to ensure it is not empty and exists in the system.
	 * @param userId the unique identifier of the user to validate
	 * @throws UserNotFound if the user ID is not valid
	 */
	private void validateUserId(UUID userId) {
		if (String.valueOf(userId).isEmpty() || userService.getUserById(userId) == null) {
			throw new UserNotFound("Invalid User ID");
		}
	}
}
