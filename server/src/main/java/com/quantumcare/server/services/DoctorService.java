package com.quantumcare.server.services;

import com.quantumcare.server.factories.DoctorFactory;
import com.quantumcare.server.factories.UserFactory;
import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.User;
import com.quantumcare.server.repositories.DoctorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DoctorService {
	
	private final UserFactory userFactory;
	private final DoctorFactory doctorFactory;
	private final DoctorRepository doctorRepository;
	
	@Autowired
	public DoctorService(UserFactory userFactory, DoctorFactory doctorFactory, DoctorRepository doctorRepository) {
		this.userFactory = userFactory;
    this.doctorFactory = doctorFactory;
    this.doctorRepository = doctorRepository;
	}
	
	public Doctor getDoctorById(UUID id) {
		return doctorRepository.findById(id).orElse(null);
	}
	
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}
	
	@Transactional
	public Doctor postDoctor(Doctor reqDoctor) {
		User user = userFactory.createUser(reqDoctor.getUser());
		Doctor doctor = doctorFactory.createDoctor(user, reqDoctor.getPractitioner());
		
		return doctorRepository.save(doctor);
	}
	
	public void putDoctor(Doctor prevDoctor, Doctor currDoctor) {
		doctorFactory.updateDoctor(prevDoctor, currDoctor);
    doctorRepository.save(prevDoctor);
	}
	
	public void putAvailabilities(Doctor reqDoctor, List<Doctor.Availabilities> newAvailabilities) {
		List<Doctor.Availabilities> availabilities = doctorFactory.createAvailabilities(newAvailabilities);
		
		reqDoctor.setAvailabilities(availabilities);
		doctorRepository.save(reqDoctor);
	}
	
	public void deleteDoctor(Doctor reqDoctor) {
		doctorRepository.delete(reqDoctor);
	}
}
