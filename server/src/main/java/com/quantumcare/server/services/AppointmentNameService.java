package com.quantumcare.server.services;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.repositories.DoctorRepository;
import com.quantumcare.server.repositories.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentNameService {
	
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;
	
	public AppointmentNameService(DoctorRepository doctorRepository, PatientRepository patientRepository) {
    this.doctorRepository = doctorRepository;
    this.patientRepository = patientRepository;
  }
	
	// sets the doctor and patient names for an appointment if they are not already set
	public void setAppointmentNames(List<Appointments> appointments) {
		if (appointments != null) {
			for (Appointments appointment : appointments) {
				// set doctor name
				Optional<Doctor> doctorOpt = doctorRepository.findById(appointment.getDoctorId());
				if (doctorOpt.isPresent()) {
					User doctorUser = doctorOpt.get().getUser();
					appointment.setDoctorName("Dr. " + doctorUser.getFirstName() + " " + doctorUser.getLastName());
				}
				
				// set patient name
				Optional<Patient> patientOpt = patientRepository.findById(appointment.getPatientId());
				if (patientOpt.isPresent()) {
					User patientUser = patientOpt.get().getUser();
					appointment.setPatientName(patientUser.getFirstName() + " " + patientUser.getLastName());
				}
			}
		}
	}
}
