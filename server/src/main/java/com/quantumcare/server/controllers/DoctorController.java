package com.quantumcare.server.controllers;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
	
	private final DoctorService doctorService;
	
	@Autowired
	public DoctorController(DoctorService doctorService) {
    this.doctorService = doctorService;
  }
	
	@GetMapping("/{doctorId}")
	public Doctor getDoctor(@PathVariable Integer doctorId) {
		return new Doctor();
	}
	
//	@PostMapping
//
//
//	@PutMapping
//
//
//	@PatchMapping
//
//
//	@DeleteMapping
}
