package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.services.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
			Patient patient = patientService.getPatientById(id);
			Appointments currAppointment = patientService.postAppointment(patient, appointment);
			
			return ResponseEntity.ok(Map.of(
				"appointment", currAppointment,
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
			
			return ResponseEntity.ok(Map.of(
				"patient", currPatient,
				"message", "Patient updated successfully"
			));
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update patient.");
		}
	}
	
	@PutMapping("/{id}/appointment")
	public ResponseEntity<?> updateAppointment(
		@PathVariable UUID id, @Valid @RequestBody Appointments appointment
	) {
		try {
			Patient patient = patientService.getPatientById(id);
			List<Appointments> currAppointments = patientService.putAppointment(patient, appointment);
			
			return ResponseEntity.ok(Map.of(
				"appointment", currAppointments,
				"message", "Appointment updated successfully"
			));
		} catch (Exception _) {
			return ResponseEntity.internalServerError().body("Database error. Failed to update appointment.");
		}
	}
	
	@DeleteMapping("/{patientId}/appointment/{aptId}")
	public ResponseEntity<?> deleteAppointment(
		@PathVariable UUID patientId, @PathVariable Long aptId
	) {
		try {
			Patient patient = patientService.getPatientById(patientId);
			List<Appointments> currAppointments = patientService.deleteAppointment(patient, aptId);
			
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
			Patient currPatient = getPatientById(id);
			patientService.deletePatient(currPatient);
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
	public Patient validatePatientId(UUID id) {
		Patient patient = patientService.getPatientById(id);
		
		if (String.valueOf(id).isEmpty() || patient == null) {
			throw new EntityNotFound("Invalid Patient ID");
		}
		return patient;
	}
	// ---------------------- END HELPERS ---------------------- //
}
