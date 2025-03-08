package com.quantumcare.server.services;

import com.quantumcare.server.factories.PatientFactory;
import com.quantumcare.server.factories.UserFactory;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.repositories.PatientRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PatientService {
	
	private final UserFactory userFactory;
	private final PatientFactory patientFactory;
	private final PatientRepository patientRepository;
	
	@Autowired
	public PatientService(UserFactory userFactory, PatientFactory patientFactory, PatientRepository patientRepository) {
    this.userFactory = userFactory;
    this.patientFactory = patientFactory;
    this.patientRepository = patientRepository;
  }
	
	public Patient getPatientById(UUID id) {
    return patientRepository.findById(id).orElse(null);
  }
	
	public List<Patient> getAllPatients() {
		return patientRepository.findAll();
	}
	
	@Transactional
	public Patient postPatient(Patient reqPatient) {
		User user = userFactory.createUser(reqPatient.getUser());
		Patient patient = patientFactory.createPatient(user, reqPatient);
		
		return patientRepository.save(patient);
	}
	
	public void postAppointment(Patient reqPatient, Appointments reqAppointments) {
		reqPatient.getAppointments().addFirst(reqAppointments);
		patientRepository.save(reqPatient);
	}
	
	public void putPatient(Patient prevPatient, Patient currPatient) {
    patientFactory.updatePatient(prevPatient, currPatient);
    patientRepository.save(prevPatient);
  }
	
	public void putAppointment(Patient reqPatient, Appointments reqAppointments) {
		List<Appointments> appointments = reqPatient.getAppointments();
		
		// remove old appointment if exists
		appointments.removeIf((apt) -> apt.get_id().equals(reqAppointments.get_id()));
		appointments.add(reqAppointments);
		patientRepository.save(reqPatient);
	}
	
	// todo: work on openai medical history
	
	public void deletePatient(Patient reqPatient) {
		patientRepository.delete(reqPatient);
	}
}
