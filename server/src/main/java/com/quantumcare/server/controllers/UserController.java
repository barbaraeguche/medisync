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
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable UUID id) {
		// if not id is sent or id does not exist in database, send a 404 error
		validateUserId(id);
		return userService.getUserById(id);
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
	public ResponseEntity<String> replaceUser(@PathVariable UUID id, @Valid @RequestBody User user) {
		try {
			User currUser = getUser(id);
			userService.putUser(currUser, user);
			return ResponseEntity.ok("User updated successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update user: " + exp.getMessage());
		}
	}
	
	@PatchMapping("/{path}/{id}")
	public ResponseEntity<String> updateUser(@PathVariable String path, @PathVariable UUID id, @RequestBody User user) {
		try {
			User currUser = getUser(id);
   
			if (path.equalsIgnoreCase("address")) {
				userService.patchAddress(currUser, user);
			} else if (path.equalsIgnoreCase("emergency")) {
				userService.patchEmergencyContact(currUser, user);
			}
			return ResponseEntity.ok("User updated successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update user: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
		try {
			User currUser = getUser(id);
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
	 * @throws UserNotFound if the user ID is not valid
	 */
	private void validateUserId(UUID id) {
		if (String.valueOf(id).isEmpty() || userService.getUserById(id) == null) {
			throw new UserNotFound("Invalid User ID");
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
