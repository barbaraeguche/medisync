package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    validateDoctorId(id);
    return doctorService.getDoctorById(id);
  }
	
	@GetMapping
	public List<Doctor> getAllDoctors() {
    return doctorService.getAllDoctors();
  }
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateDoctor(
		@PathVariable UUID id, @RequestBody Doctor doctor
	) {
		try {
			Doctor prevDoctor = getDoctorById(id);
			Doctor currDoctor = doctorService.putDoctor(prevDoctor, doctor);
			
			return ResponseEntity.ok(Map.of(
				"doctor", currDoctor,
				"message", "Doctor updated successfully"
			));
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update doctor: " + exp.getMessage());
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
			return ResponseEntity.internalServerError().body("Failed to update availability: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable UUID id) {
		try {
			Doctor currDoctor = getDoctorById(id);
			doctorService.deleteDoctor(currDoctor);
			return ResponseEntity.ok("Doctor deleted successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to delete doctor: " + exp.getMessage());
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given doctor ID to ensure it is not empty and exists in the system.
	 * @param id the unique identifier of the doctor to validate
	 * @throws EntityNotFound if the doctor ID is not valid
	 */
	private void validateDoctorId(UUID id) {
		if (String.valueOf(id).isEmpty() || doctorService.getDoctorById(id) == null) {
			throw new EntityNotFound("Invalid Doctor ID");
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
