package com.quantumcare.server.services;

import com.quantumcare.server.repositories.NurseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NurseService {
	
	private final NurseRepository nurseRepository;
	
	@Autowired
	public NurseService(NurseRepository nurseRepository) {
    this.nurseRepository = nurseRepository;
  }
}
