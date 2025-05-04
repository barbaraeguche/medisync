package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.services.PatientService;
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
@RequestMapping("/api/patients")
public class PatientController {
	
	private final PatientService patientService;
	
	@Autowired
	public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }
	
	@GetMapping("/{id}")
	public Patient getPatientById(@PathVariable UUID id) {
		// if id is null or id does not exist in doctor db, send a 404 error
		return validatePatientId(id);
	}
	
	@GetMapping
	public List<Patient> getAllPatients() {
		return patientService.getAllPatients();
	}
	
	@PostMapping("/{id}/appointment")
	public ResponseEntity<?> createAppointment(
		@PathVariable UUID id, @Valid @RequestBody Appointments appointment
	) {
		try {
			Patient patient = getPatientById(id);
			List<Appointments> currAppointments = patientService.postAppointment(patient.get_id(), appointment);
			
			return ResponseEntity.ok(Map.of(
				"appointment", currAppointments,
				"message", "Appointment created successfully"
			));
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to create appointment.");
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updatePatient(
		@PathVariable UUID id, @RequestBody Patient patient
	) {
		try {
			Patient prevPatient = getPatientById(id);
			Patient currPatient = patientService.putPatient(prevPatient, patient);
			
			// reset password before sending to frontend
			currPatient.getUser().setPassword("");
			
			return ResponseEntity.ok(Map.of(
				"patient", currPatient,
				"message", "Patient updated successfully"
			));
		} catch (DataIntegrityViolationException exp) {
			// handle unique constraint violations
			String errorMessage = DbErrorUtils.getErrorMessage(exp, true);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update patient.");
		}
	}
	
	@PutMapping("/{id}/appointment")
	public ResponseEntity<?> updateAppointment(
		@PathVariable UUID id, @Valid @RequestBody Appointments appointment
	) {
		try {
			Patient patient = getPatientById(id);
			List<Appointments> currAppointments = patientService.putAppointment(patient.get_id(), appointment);
			
			return ResponseEntity.ok(Map.of(
				"appointment", currAppointments,
				"message", "Appointment updated successfully"
			));
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update appointment.");
		}
	}
	
	@DeleteMapping("/{id}/appointment/{aptId}")
	public ResponseEntity<?> deleteAppointment(
		@PathVariable UUID id, @PathVariable Long aptId
	) {
		try {
			Patient patient = getPatientById(id);
			List<Appointments> currAppointments = patientService.deleteAppointment(patient.get_id(), aptId);
			
			return ResponseEntity.ok(Map.of(
				"appointment", currAppointments,
				"message", "Appointment deleted successfully"
			));
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to delete appointment.");
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePatient(@PathVariable UUID id) {
		try {
			Patient patient = getPatientById(id);
			patientService.deletePatient(patient.get_id());
			return ResponseEntity.ok("Patient deleted successfully");
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to delete patient.");
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given patient ID to ensure it is not empty and exists in the system.
	 * @param id the unique identifier of the patient to validate
	 * @throws EntityNotFound if the patient ID is not valid
	 * @return patient if found.
	 */
	private Patient validatePatientId(UUID id) {
		Patient patient = patientService.getPatientById(id);
		
		if (String.valueOf(id).isEmpty() || patient == null) {
			throw new EntityNotFound("Invalid Patient ID");
		}
		return patient;
	}
	// ---------------------- END HELPERS ---------------------- //
}
