package com.quantumcare.server.services;

import com.quantumcare.server.factories.PatientFactory;
import com.quantumcare.server.factories.UserFactory;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.repositories.AppointmentRepository;
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
	private final AppointmentRepository appointmentRepository;
	private final AppointmentNameService appointmentNameService;
	
	@Autowired
	public PatientService(
		UserFactory userFactory, PatientFactory patientFactory, PatientRepository patientRepository,
		AppointmentRepository appointmentRepository, AppointmentNameService appointmentNameService
		) {
    this.userFactory = userFactory;
    this.patientFactory = patientFactory;
    this.patientRepository = patientRepository;
		this.appointmentRepository = appointmentRepository;
		this.appointmentNameService = appointmentNameService;
  }
	
	public Patient getPatientById(UUID id) {
		Patient patient = patientRepository.findById(id).orElse(null);
		
		if (patient != null) {
			appointmentNameService.setAppointmentNames(patient.getAppointments());
    }
		return patient;
  }
	
	public List<Patient> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		
		for (Patient patient : patients) {
			appointmentNameService.setAppointmentNames(patient.getAppointments());
		}
		return patients;
	}
	
	@Transactional
	public Patient postPatient(Patient reqPatient) {
		User user = userFactory.createUser(reqPatient.getUser());
		Patient patient = patientFactory.createPatient(user, reqPatient);
		
		return patientRepository.save(patient);
	}
	
	public Appointments postAppointment(Patient reqPatient, Appointments reqAppointments) {
		reqPatient.getAppointments().add(reqAppointments);
		patientRepository.save(reqPatient);
		return reqAppointments;
	}
	
	public Patient putPatient(Patient prevPatient, Patient currPatient) {
    patientFactory.updatePatient(prevPatient, currPatient);
    return patientRepository.save(prevPatient);
  }
	
	public List<Appointments> putAppointment(Patient reqPatient, Appointments reqAppointments) {
		List<Appointments> appointments = reqPatient.getAppointments();
		
		// remove old appointment if exists
		appointments.removeIf((apt) -> apt.get_id().equals(reqAppointments.get_id()));
		appointments.add(reqAppointments);
		
		return patientRepository.save(reqPatient).getAppointments();
	}
	
	public List<Appointments> deleteAppointment(UUID patientId, Long reqAptId) {
		// remove appointment from table itself
		appointmentRepository.deleteById(reqAptId);
		// return all remaining appointments for the patient
		return appointmentRepository.findByPatientId(patientId);
	}
	
	public void deletePatient(UUID patientId) {
		patientRepository.deleteById(patientId);
	}
}
