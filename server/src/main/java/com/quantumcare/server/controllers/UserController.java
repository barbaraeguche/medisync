package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.User;
import com.quantumcare.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
    this.userService = userService;
	}
	
	@GetMapping
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(
		@PathVariable UUID id, @RequestBody User user
	) {
		try {
			// if id is null or id does not exist in db, send a 404 error
			validateUserId(id);
			
			User prevUser = userService.getUserById(id);
			User currUser = userService.putUser(prevUser, user);
			return ResponseEntity.ok(Map.of(
				"user", currUser,
				"message", "User updated successfully"
			));
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update user.");
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
