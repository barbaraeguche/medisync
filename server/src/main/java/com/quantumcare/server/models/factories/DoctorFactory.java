package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Practitioner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DoctorFactory {
  public Doctor createDoctor(User user, Practitioner practitioner) {
		return new Doctor(user, practitioner);
	}
	
	public Doctor.DoctorAvailabilities createDoctorAvailabilities(LocalDate day, LocalTime startTime, LocalTime endTime) {
		return new Doctor.DoctorAvailabilities(day, startTime, endTime);
	}
}
