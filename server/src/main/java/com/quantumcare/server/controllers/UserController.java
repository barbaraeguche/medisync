package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.User;
import com.quantumcare.server.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
    this.userService = userService;
	}
	
	@GetMapping("/{id}")
	public User getUserById(@PathVariable UUID id) {
		// if id is null or id does not exist in db, send a 404 error
		validateUserId(id);
		return userService.getUserById(id);
	}
	
	@GetMapping("/email/{email}")
	public User findUserByEmail(@PathVariable String email) {
		// during login
		return userService.findUserByEmail(email);
	}
	
	@GetMapping
	public List<User> getAllUsers() {
		return userService.getAllUsers();
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
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateUser(@PathVariable UUID id, @RequestBody User user) {
		try {
			User currUser = getUserById(id);
			userService.putUser(currUser, user);
			return ResponseEntity.ok("User updated successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update user: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
		try {
			User currUser = getUserById(id);
			userService.deleteUser(currUser);
			return ResponseEntity.ok("User deleted successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to delete user: " + exp.getMessage());
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given user ID to ensure it is not empty and exists in the system.
	 * @param id the unique identifier of the user to validate
	 * @throws EntityNotFound if the user ID is not valid
	 */
	private void validateUserId(UUID id) {
		if (String.valueOf(id).isEmpty() || userService.getUserById(id) == null) {
			throw new EntityNotFound("Invalid User ID");
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
