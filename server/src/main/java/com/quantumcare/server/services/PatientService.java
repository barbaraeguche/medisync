package com.quantumcare.server.services;

import com.quantumcare.server.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
	
	private final PatientRepository patientRepository;
	
	@Autowired
	public PatientService(PatientRepository patientRepository) {
    this.patientRepository = patientRepository;
  }
}
