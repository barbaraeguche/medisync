package com.quantumcare.server.services;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.repositories.DoctorRepository;
import com.quantumcare.server.repositories.PatientRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppointmentNameService {
	
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;
	
	public AppointmentNameService(DoctorRepository doctorRepository, PatientRepository patientRepository) {
    this.doctorRepository = doctorRepository;
    this.patientRepository = patientRepository;
  }
	
	// sets the doctor and patient names for appointments with batch retrieval for better performance
	@Transactional
	public void setAppointmentNames(List<Appointments> appointments) {
		if (appointments == null || appointments.isEmpty()) {
			return;
		}
		
		// extract unique doctor IDs
		Set<UUID> doctorIds = appointments.stream()
			.map(Appointments::getDoctorId)
			.collect(Collectors.toSet());
		// extract unique patient IDs
		Set<UUID> patientIds = appointments.stream()
			.map(Appointments::getPatientId)
			.collect(Collectors.toSet());
			
		// batch retrieves all necessary doctors
		Map<UUID, Doctor> doctorMap = new HashMap<>();
		if (!doctorIds.isEmpty()) {
			List<Doctor> doctors = doctorRepository.findAllById(doctorIds);
			doctors.forEach((doc) -> doctorMap.put(doc.get_id(), doc));
		}
		// batch retrieves all necessary patients
		Map<UUID, Patient> patientMap = new HashMap<>();
		if (!patientIds.isEmpty()) {
			List<Patient> patients = patientRepository.findAllById(patientIds);
			patients.forEach((pat) -> patientMap.put(pat.get_id(), pat));
		}
		
		// set names for all appointments using the retrieved maps
		for (Appointments appointment : appointments) {
			// set doctor name
			UUID doctorId = appointment.getDoctorId();
			if (doctorMap.containsKey(doctorId)) {
				User doctorUser = doctorMap.get(doctorId).getUser();
				appointment.setDoctorName("Dr. " + doctorUser.getFirstName() + " " + doctorUser.getLastName());
			}
			
			// set patient name
			UUID patientId = appointment.getPatientId();
			if (patientMap.containsKey(patientId)) {
				User patientUser = patientMap.get(patientId).getUser();
				appointment.setPatientName(patientUser.getFirstName() + " " + patientUser.getLastName());
			}
		}
	}
}
