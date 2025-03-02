package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
	
	private final DoctorService doctorService;
	
	@Autowired
	public DoctorController(DoctorService doctorService) {
    this.doctorService = doctorService;
  }
	
	@GetMapping("/{id}")
	public Doctor getDoctor(@PathVariable UUID id) {
		// if not id is sent or id does not exist in database, send a 404 error
		validateDoctorId(id);
		return doctorService.getDoctorById(id);
	}
	
	@PostMapping
	public ResponseEntity<String> createDoctor(@Valid @RequestBody Doctor doctor) {
		try {
			doctorService.postDoctor(doctor);
			return ResponseEntity.ok("Doctor created successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to create doctor: " + exp.getMessage());
		}
	}
	
//	@PutMapping("/{doctorId}")
//	public ResponseEntity<String> replaceDoctor(@PathVariable UUID doctorId, @RequestBody Doctor doctor) {
//		try {
//			doctorService.addDoctor(doctor);
//			return ResponseEntity.ok("Doctor updated successfully");
//		} catch (Exception exp) {
//			return ResponseEntity.internalServerError().body("Failed to update doctor: " + exp.getMessage());
//		}
//	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable UUID id) {
		try {
			Doctor currDoctor = getDoctor(id);
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
