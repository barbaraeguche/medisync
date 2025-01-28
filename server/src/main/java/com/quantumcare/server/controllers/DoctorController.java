package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.DoctorNotFound;
import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.services.DoctorService;
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
	
//	@GetMapping("/{doctorId}")
//	public Doctor getDoctor(@PathVariable UUID doctorId) {
//		// if not id is sent or id does not exist in database, send a 404 error
//		validateDoctorId(doctorId);
//
//  	// return found doctor
//		return doctorService.findById(doctorId);
//	}
//
//	@PostMapping
//	public ResponseEntity<String> createDoctor(@RequestBody Doctor doctor) {
//		try {
//			doctorService.addDoctor(doctor);
//			return ResponseEntity.ok("Doctor created successfully");
//		} catch (Exception exp) {
//			return ResponseEntity.internalServerError().body("Failed to create doctor: " + exp.getMessage());
//		}
//	}
	
//	@PutMapping("/{doctorId}")
//	public ResponseEntity<String> replaceDoctor(@PathVariable UUID doctorId, @RequestBody Doctor doctor) {
//		try {
//			doctorService.addDoctor(doctor);
//			return ResponseEntity.ok("Doctor updated successfully");
//		} catch (Exception exp) {
//			return ResponseEntity.internalServerError().body("Failed to update doctor: " + exp.getMessage());
//		}
//	}
//
//	@DeleteMapping("/{doctorId}")
//	public ResponseEntity<String> deleteDoctor(@PathVariable UUID doctorId) {
//		try {
//			doctorService.deleteDoctor(doctorId);
//			return ResponseEntity.ok("Doctor deleted successfully");
//		} catch (Exception exp) {
//			return ResponseEntity.internalServerError().body("Failed to delete doctor: " + exp.getMessage());
//		}
//	}
	
	
	// ------------------------ HELPERS ------------------------ //
	
//	/**
//	 * validates the given doctor ID to ensure it is not empty and exists in the system.
//	 * @param doctorId the unique identifier of the doctor to validate
//	 * @throws DoctorNotFound if the doctor ID is not valid
//	 */
//	private void validateDoctorId(UUID doctorId) {
//		if (String.valueOf(doctorId).isEmpty() || doctorService.findById(doctorId) == null) {
//			throw new DoctorNotFound("Invalid Doctor ID");
//		}
//	}
	
	// ---------------------- END HELPERS ---------------------- //
}
