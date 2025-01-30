package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.NurseNotFound;
import com.quantumcare.server.models.Nurse;
import com.quantumcare.server.services.NurseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/nurse")
public class NurseController {
	
	private final NurseService nurseService;
	
	@Autowired
	public NurseController(NurseService nurseService) {
    this.nurseService = nurseService;
  }
	
	@GetMapping("/{nurseId}")
	public Nurse getNurse(@PathVariable UUID nurseId) {
		// if not id is sent or id does not exist in database, send a 404 error
		validateNurseId(nurseId);
    
    // return found nurse
    return nurseService.getNurseById(nurseId);
	}
	
	@PostMapping
	public ResponseEntity<String> createNurse(@Valid @RequestBody Nurse nurse) {
		try {
			nurseService.postNurse(nurse);
      return ResponseEntity.ok("Nurse created successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to create nurse: " + exp.getMessage());
		}
	}
	
	@PutMapping("/{nurseId}")
	public ResponseEntity<String> replaceNurse(@PathVariable UUID nurseId, @Valid @RequestBody Nurse nurse) {
		try {
			Nurse currNurse = getNurse(nurseId);
      nurseService.putNurse(currNurse, nurse);
      return ResponseEntity.ok("Nurse updated successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update nurse: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{nurseId}")
	public ResponseEntity<String> deleteNurse(@PathVariable UUID nurseId) {
		try {
			Nurse currNurse = getNurse(nurseId);
      nurseService.deleteNurse(currNurse);
      return ResponseEntity.ok("Nurse deleted successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to delete nurse: " + exp.getMessage());
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given nurse ID to ensure it is not empty and exists in the system.
	 * @param nurseId the unique identifier of the nurse to validate
	 * @throws NurseNotFound if the nurse ID is not valid
	 */
	private void validateNurseId(UUID nurseId) {
		if (String.valueOf(nurseId).isEmpty() || nurseService.getNurseById(nurseId) == null) {
			throw new NurseNotFound("Invalid Nurse ID");
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
