package com.quantumcare.server.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quantumcare.server.models.*;
import com.quantumcare.server.services.*;
import com.quantumcare.server.utilities.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	private final JwtUtils jwtUtils;
	private final ObjectMapper objectMapper;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final UserService userService;
	private final DoctorService doctorService;
	private final PatientService patientService;
	
	@Autowired
	public AuthController(
		JwtUtils jwtUtils, ObjectMapper objectMapper,
		PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
		UserService userService, DoctorService doctorService, PatientService patientService
	) {
		this.jwtUtils = jwtUtils;
		this.objectMapper = objectMapper;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.userService = userService;
    this.doctorService = doctorService;
    this.patientService = patientService;
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> signInUser(
		@Valid @RequestBody Map<String, String> loginRequest, HttpServletResponse response
	) {
		try {
			// extract credentials from request
			String email = loginRequest.get("email");
			String password = loginRequest.get("password");
			
			// authenticate user
			Authentication _ = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(email, password)
			);
			
			// find user by email
			User user = userService.findUserByEmail(email);
			if (user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User does not exist");
			}
			
			// generate JWT token
			String token = jwtUtils.generateToken(user);
			
			// set the token as an HTTP-only cookie
			Cookie jwtCookie = JwtCookies.createCookie("token", token);
			JwtCookies.setCookieAttr(jwtCookie, 3600);
			response.addCookie(jwtCookie);
			
			// return user details (without the password)
			user.setPassword("");
			Map<String, Object> userObj = Map.of("user", user);
			
			return ResponseEntity.ok(userObj);
		} catch (BadCredentialsException _) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to authenticate user.");
		}
	}
	
	@PostMapping("/register/{role}")
	public ResponseEntity<?> registerUser(
		@PathVariable String role, @Valid @RequestBody Object registerRequest, HttpServletResponse response
	) {
		try {
			User createdUser;
			
			// register based on the chosen role
			if ("Doctor".equals(role)) {
				Doctor doctor = objectMapper.convertValue(registerRequest, Doctor.class);
				User userAsDoctor = doctor.getUser();
				
				// hash the password before storing, and create the doctor record
				userAsDoctor.setPassword(passwordEncoder.encode(userAsDoctor.getPassword()));
				createdUser = doctorService.postDoctor(doctor).getUser();
			} else if ("Patient".equals(role)) {
				Patient patient = objectMapper.convertValue(registerRequest, Patient.class);
        User userAsPatient = patient.getUser();
        
        // hash the password before storing, and create the patient record
        userAsPatient.setPassword(passwordEncoder.encode(userAsPatient.getPassword()));
        createdUser =  patientService.postPatient(patient).getUser();
			} else if ("Admin".endsWith(role)) {
				User user = objectMapper.convertValue(registerRequest, User.class);
				
				// hash the password before storing, and create the admin record
				user.setPassword(passwordEncoder.encode(user.getPassword()));
				createdUser = userService.postUser(user);
			} else {
				return ResponseEntity.badRequest().body("Invalid role specified");
			}
			
			// generate JWT token
			String token = jwtUtils.generateToken(createdUser);
			
			// set the token as an HTTP-only cookie
			Cookie jwtCookie = JwtCookies.createCookie("token", token);
			JwtCookies.setCookieAttr(jwtCookie, 3600);
			response.addCookie(jwtCookie);
			
			// return user details (without the password)
			createdUser.setPassword("");
			Map<String, Object> userObj = Map.of("user", createdUser);
			
			return ResponseEntity.ok(userObj);
		} catch (DataIntegrityViolationException exp) {
			// handle unique constraint violations
			String errorMessage = DbErrorUtils.getErrorMessage(exp);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to register user.");
		}
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?>logoutUser(HttpServletResponse response) {
		// set the token as an HTTP-only cookie
		Cookie jwtCookie = JwtCookies.createCookie("token", null);
		JwtCookies.setCookieAttr(jwtCookie, 0);
		response.addCookie(jwtCookie);
		
		// clear security context
		SecurityContextHolder.clearContext();
		
		return ResponseEntity.ok("User logged out");
	}
	
	@GetMapping("/verify")
	public ResponseEntity<?> verifyToken(HttpServletRequest request) {
		try {
			// extract token from cookie
			Cookie[] cookies = request.getCookies();
			String token = null;
			
			if (cookies != null) {
				for (Cookie cookie : cookies) {
					if ("token".equals(cookie.getName())) {
						token = cookie.getValue();
						break;
					}
				}
			}
			
			if (token == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
					"valid", false,
					"message", "No authentication token found"
				));
			}
			
			// validate token
			if (jwtUtils.validateToken(token)) {
				String userId = jwtUtils.getIdFromToken(token);
				User user = userService.getUserById(UUID.fromString(userId));
				
				if (user != null) {
					user.setPassword("");
					return ResponseEntity.ok(Map.of(
						"valid", true,
            "user", user
					));
				}
			}
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
				"valid", false,
				"message", "Invalid or expired token."
			));
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body(Map.of(
				"valid", false,
				"message", "Failed to verify token"
			));
		}
	}
}
