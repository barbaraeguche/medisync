package com.quantumcare.server.controllers;

import com.quantumcare.server.services.NurseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/nurse")
public class NurseController {
	
	NurseService nurseService;
	
	@Autowired
	public NurseController(NurseService nurseService) {
    this.nurseService = nurseService;
  }
}
