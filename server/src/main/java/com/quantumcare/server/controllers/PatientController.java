package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.PatientNotFound;
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
	
	@GetMapping("/{patientId}")
	public Patient getPatient(@PathVariable UUID patientId) {
		// if not id is sent or id does not exist in database, send a 404 error
    validatePatientId(patientId);
    
    // return found patient
    return patientService.getPatientById(patientId);
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
	
	@PutMapping("/{patientId}")
  public ResponseEntity<String> replacePatient(@PathVariable UUID patientId, @Valid @RequestBody Patient patient) {
		try {
			Patient currPatient = getPatient(patientId);
      patientService.putPatient(currPatient, patient);
      return ResponseEntity.ok("Patient updated successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update patient: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{patientId}")
  public ResponseEntity<String> deletePatient(@PathVariable UUID patientId) {
		try {
			Patient currPatient = getPatient(patientId);
			patientService.deletePatient(currPatient);
			return ResponseEntity.ok("Patient deleted successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to delete patient: " + exp.getMessage());
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given patient ID to ensure it is not empty and exists in the system.
	 * @param patientId the unique identifier of the patient to validate
	 * @throws PatientNotFound if the patient ID is not valid
	 */
	private void validatePatientId(UUID patientId) {
		if (String.valueOf(patientId).isEmpty() || patientService.getPatientById(patientId) == null) {
			throw new PatientNotFound("Invalid Patient ID");
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
