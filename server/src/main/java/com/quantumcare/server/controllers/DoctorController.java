package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.helpers.Practitioner;
import com.quantumcare.server.services.DoctorService;
import com.quantumcare.server.utilities.DbErrorUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
	
	private final DoctorService doctorService;
	
	@Autowired
	public DoctorController(DoctorService doctorService) {
    this.doctorService = doctorService;
  }
	
	@GetMapping("/{id}")
	public Doctor getDoctorById(@PathVariable UUID id) {
		// if id is null or id does not exist in doctor db, send a 404 error
    return validateDoctorId(id);
  }
	
	@GetMapping
	public List<Doctor> getAllDoctors() {
    return doctorService.getAllDoctors();
  }
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateDoctor(
		@PathVariable UUID id, @RequestBody Practitioner practitioner
	) {
		try {
			Doctor prevDoctor = getDoctorById(id);
			Doctor currDoctor = doctorService.putDoctor(prevDoctor, practitioner);
			
			// reset password before sending to frontend
			currDoctor.getUser().setPassword("");
			
			return ResponseEntity.ok(Map.of(
				"doctor", currDoctor,
				"message", "Doctor updated successfully"
			));
		} catch (DataIntegrityViolationException exp) {
			// handle unique constraint violations
			String errorMessage = DbErrorUtils.getErrorMessage(exp, true);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update doctor.");
		}
	}
	
	@PutMapping("/{id}/availability")
	public ResponseEntity<?> updateAvailability(
		@PathVariable UUID id, @Valid @RequestBody List<Doctor.Availabilities> availabilities
	) {
		try {
			Doctor currDoctor = getDoctorById(id);
			List<Doctor.Availabilities> newAvailabilities = doctorService.putAvailabilities(currDoctor, availabilities);
			
			return ResponseEntity.ok(Map.of(
				"availability", newAvailabilities,
				"message", "Availability updated successfully"
			));
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body(exp.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable UUID id) {
		try {
			Doctor currDoctor = getDoctorById(id);
			doctorService.deleteDoctor(currDoctor.get_id());
			return ResponseEntity.ok("Doctor deleted successfully");
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to delete doctor.");
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given doctor ID to ensure it is not empty and exists in the system.
	 * @param id the unique identifier of the doctor to validate
	 * @throws EntityNotFound if the doctor ID is not valid
	 * @return doctor if found.
	 */
	private Doctor validateDoctorId(UUID id) {
		Doctor doctor = doctorService.getDoctorById(id);
		
		if (String.valueOf(id).isEmpty() || doctor == null) {
			throw new EntityNotFound("Invalid Doctor ID");
		}
		return doctor;
	}
	// ---------------------- END HELPERS ---------------------- //
}
