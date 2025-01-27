package com.quantumcare.server.services;

import com.quantumcare.server.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
	
	private final DoctorRepository doctorRepository;
	
	@Autowired
	public DoctorService(DoctorRepository doctorRepository) {
    this.doctorRepository = doctorRepository;
  }
}
