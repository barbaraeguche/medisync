package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.services.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
	
	private final PatientService patientService;
	
	@Autowired
	public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }
	
	@GetMapping("/{id}")
	public Patient getPatient(@PathVariable UUID id) {
		// if not id is sent or id does not exist in database, send a 404 error
    validatePatientId(id);
		return patientService.getPatientById(id);
	}
	
	@PostMapping
	public ResponseEntity<String> createPatient(@Valid @RequestBody Patient patient) {
		try {
      patientService.postPatient(patient);
      return ResponseEntity.ok("Patient created successfully");
    } catch (Exception exp) {
      return ResponseEntity.internalServerError().body("Failed to create patient: " + exp.getMessage());
    }
	}
	
	@PutMapping("/{id}")
  public ResponseEntity<String> replacePatient(@PathVariable UUID id, @Valid @RequestBody Patient patient) {
		try {
			Patient currPatient = getPatient(id);
      patientService.putPatient(currPatient, patient);
      return ResponseEntity.ok("Patient updated successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update patient: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
  public ResponseEntity<String> deletePatient(@PathVariable UUID id) {
		try {
			Patient currPatient = getPatient(id);
			patientService.deletePatient(currPatient);
			return ResponseEntity.ok("Patient deleted successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to delete patient: " + exp.getMessage());
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given patient ID to ensure it is not empty and exists in the system.
	 * @param id the unique identifier of the patient to validate
	 * @throws EntityNotFound if the patient ID is not valid
	 */
	private void validatePatientId(UUID id) {
		if (String.valueOf(id).isEmpty() || patientService.getPatientById(id) == null) {
			throw new EntityNotFound("Invalid Patient ID");
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
