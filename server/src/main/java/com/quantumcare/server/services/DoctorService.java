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
	private final AppointmentNameService appointmentNameService;
	
	@Autowired
	public DoctorService(
		UserFactory userFactory, DoctorFactory doctorFactory,
		DoctorRepository doctorRepository, AppointmentNameService appointmentNameService
	) {
		this.userFactory = userFactory;
    this.doctorFactory = doctorFactory;
    this.doctorRepository = doctorRepository;
		this.appointmentNameService = appointmentNameService;
	}
	
	public Doctor getDoctorById(UUID id) {
		Doctor doctor = doctorRepository.findById(id).orElse(null);
		
		if (doctor != null) {
      appointmentNameService.setAppointmentNames(doctor.getAppointments());
    }
		return doctor;
	}
	
	public List<Doctor> getAllDoctors() {
		List<Doctor> doctors =  doctorRepository.findAll();
		
		for (Doctor doctor : doctors) {
      appointmentNameService.setAppointmentNames(doctor.getAppointments());
    }
		return doctors;
	}
	
	@Transactional
	public Doctor postDoctor(Doctor reqDoctor) {
		User user = userFactory.createUser(reqDoctor.getUser());
		Doctor doctor = doctorFactory.createDoctor(user, reqDoctor.getPractitioner());
		
		return doctorRepository.save(doctor);
	}
	
	public Doctor putDoctor(Doctor prevDoctor, Doctor currDoctor) {
		doctorFactory.updateDoctor(prevDoctor, currDoctor);
    return doctorRepository.save(prevDoctor);
	}
	
	public List<Doctor.Availabilities> putAvailabilities(Doctor reqDoctor, List<Doctor.Availabilities> newAvailabilities) {
		List<Doctor.Availabilities> availabilities = doctorFactory.createAvailabilities(newAvailabilities);
		
		reqDoctor.setAvailabilities(availabilities);
		return doctorRepository.save(reqDoctor).getAvailabilities();
	}
	
	public void deleteDoctor(Doctor reqDoctor) {
		doctorRepository.delete(reqDoctor);
	}
}
