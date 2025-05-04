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
	
	private void setAppointmentNameService(List<Appointments> appointments) {
		appointmentNameService.setAppointmentNames(appointments);
	}
	
	public Patient getPatientById(UUID id) {
		Patient patient = patientRepository.findById(id).orElse(null);
		
		if (patient != null) {
			setAppointmentNameService(patient.getAppointments());
    }
		return patient;
  }
	
	public List<Patient> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		
		for (Patient patient : patients) {
			setAppointmentNameService(patient.getAppointments());
		}
		return patients;
	}
	
	@Transactional
	public Patient postPatient(Patient reqPatient) {
		User user = userFactory.createUser(reqPatient.getUser());
		Patient patient = patientFactory.createPatient(user, reqPatient);
		
		return patientRepository.save(patient);
	}
	
	public List<Appointments> postAppointment(UUID patientId, Appointments reqAppointments) {
		appointmentRepository.save(reqAppointments);
		
		// set the doctor and patient names
		List<Appointments> appointments = appointmentRepository.findByPatientId(patientId);
		setAppointmentNameService(appointments);
		
		// return all appointments
		return appointments;
	}
	
	public Patient putPatient(Patient prevPatient, Patient currPatient) {
    patientFactory.updatePatient(prevPatient, currPatient);
    return patientRepository.save(prevPatient);
  }
	
	@Transactional
	public List<Appointments> putAppointment(UUID patientId, Appointments reqAppointments) {
		// remove appointment from table itself
		appointmentRepository.deleteById(reqAppointments.get_id());
		// set the appointment id to null
		reqAppointments.set_id(null);
		
		// return all remaining appointments for the patient
		return postAppointment(patientId, reqAppointments);
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
