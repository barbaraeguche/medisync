package com.quantumcare.server.services;

import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.factories.PatientFactory;
import com.quantumcare.server.models.factories.UserFactory;
import com.quantumcare.server.repositories.PatientRepository;
import com.quantumcare.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PatientService {
	
	private final PatientRepository patientRepository;
	private final PatientFactory patientFactory;
	private final UserFactory userFactory;
	private final UserRepository userRepository;
	
	@Autowired
	public PatientService(PatientRepository patientRepository, PatientFactory patientFactory, UserFactory userFactory, UserRepository userRepository) {
    this.patientRepository = patientRepository;
		this.patientFactory = patientFactory;
		this.userFactory = userFactory;
		this.userRepository = userRepository;
	}
	
	public Patient getPatientById(UUID id) {
		return patientRepository.findById(id).orElse(null);
  }
	
	public void postPatient(Patient reqPatient) {
		User user = userFactory.createUser(reqPatient.getUser());
		Patient patient = patientFactory.createPatient(user, reqPatient);
		
		patientRepository.save(patient);
	}
	
	public void putPatient(Patient prevPatient, Patient currPatient) {
		patientFactory.updatePatient(prevPatient, currPatient);
		patientRepository.save(prevPatient);
	}
	
	public void deletePatient(Patient reqPatient) {
		patientRepository.delete(reqPatient);
		userRepository.delete(reqPatient.getUser());
	}
}
