package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.User;
import com.quantumcare.server.services.UserService;
import com.quantumcare.server.utilities.DbErrorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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
			User prevUser = validateUserId(id);
			User currUser = userService.putUser(prevUser, user);
			
			// reset password before sending to frontend
			currUser.setPassword("");
			
			return ResponseEntity.ok(Map.of(
				"user", currUser,
				"message", "User updated successfully"
			));
		} catch (DataIntegrityViolationException exp) {
			// handle unique constraint violations
			String errorMessage = DbErrorUtils.getErrorMessage(exp, true);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update user.");
		}
	}
	
	@PutMapping("/{id}/password")
	public ResponseEntity<?> updatePassword(
		@PathVariable UUID id, @RequestBody Map<String, String> updatedPassword
	) {
		try {
			String password = updatedPassword.get("password");
			String confirmPassword = updatedPassword.get("confirmPassword");
			
			if (!confirmPassword.equals(password)) {
				return ResponseEntity.badRequest().body("Passwords do not match");
			}
			
			// if id is null or id does not exist in db, send a 404 error
			User prevUser = validateUserId(id);
			userService.putPassword(prevUser, password);
			
			return ResponseEntity.ok("Password updated successfully.");
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update password.");
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given user ID to ensure it is not empty and exists in the system.
	 * @param id the unique identifier of the user to validate
	 * @throws EntityNotFound if the user ID is not valid
	 * @return user if found.
	 */
	private User validateUserId(UUID id) {
		User user = userService.getUserById(id);
		
		if (String.valueOf(id).isEmpty() || user == null) {
			throw new EntityNotFound("Invalid User ID");
		}
		return user;
	}
	// ---------------------- END HELPERS ---------------------- //
}
