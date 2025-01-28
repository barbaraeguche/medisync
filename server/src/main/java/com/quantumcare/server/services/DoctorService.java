package com.quantumcare.server.services;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DoctorService {
	
	private final DoctorRepository doctorRepository;
	
	@Autowired
	public DoctorService(DoctorRepository doctorRepository) {
    this.doctorRepository = doctorRepository;
  }
	
	public Doctor findById(UUID id) {
    return doctorRepository.findById(id).orElse(null);
  }
	
	public void addDoctor(Doctor doctor) {
	
	}
	
	public void updateDoctor() {
	
	}
	
	public void deleteDoctor() {
	
	}
}
