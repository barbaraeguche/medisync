package com.quantumcare.server.services;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.factories.DoctorFactory;
import com.quantumcare.server.models.factories.HelperFactory;
import com.quantumcare.server.models.factories.UserFactory;
import com.quantumcare.server.models.helpers.Practitioner;
import com.quantumcare.server.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DoctorService {
	
	private final DoctorRepository doctorRepository;
	private final UserFactory userFactory;
	private final HelperFactory helperFactory;
	private final DoctorFactory doctorFactory;
	
	@Autowired
	public DoctorService(DoctorRepository doctorRepository, UserFactory userFactory, HelperFactory helperFactory, DoctorFactory doctorFactory) {
    this.doctorRepository = doctorRepository;
		this.userFactory = userFactory;
		this.helperFactory = helperFactory;
		this.doctorFactory = doctorFactory;
	}
	
	public Doctor getDoctorById(UUID id) {
    return doctorRepository.findById(id).orElse(null);
  }
	
	public void postDoctor(Doctor reqDoctor) {
		User user = userFactory.createUser(reqDoctor.getUser());
		Practitioner practitioner = helperFactory.createPractitioner(reqDoctor.getPractitioner());
		Doctor doctor = doctorFactory.createDoctor(user, practitioner);
		
		doctorRepository.save(doctor);
	}
	
	public void deleteDoctor(Doctor reqDoctor) {
		doctorRepository.delete(reqDoctor);
	}
}
