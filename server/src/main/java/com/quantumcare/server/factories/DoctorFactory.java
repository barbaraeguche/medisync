package com.quantumcare.server.factories;

import com.quantumcare.server.utilities.EntityUpdater;
import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Practitioner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class DoctorFactory {
	public Doctor createDoctor(User user, Practitioner practitioner) {
		return new Doctor(
			user, createPractitioner(practitioner)
		);
	}
	
	public List<Doctor.Availabilities> createAvailabilities(List<Doctor.Availabilities> reqAvailabilities) {
		return reqAvailabilities.stream()
			.map((availability) -> new Doctor.Availabilities(
				availability.getDate(), availability.getStartTime(), availability.getEndTime()
			))
			.collect(Collectors.toList());
	}
	
	private Practitioner createPractitioner(Practitioner reqPractitioner) {
		return new Practitioner(
			reqPractitioner.getLicenseNumber(), reqPractitioner.getSpecialization(), reqPractitioner.getYearsOfExperience(),
			reqPractitioner.getLanguages(), createEducation(reqPractitioner)
		);
	}
	
	private Practitioner.Education createEducation(Practitioner reqPractitioner) {
		return Optional.ofNullable(reqPractitioner.getEducation())
			.map((education) -> new Practitioner.Education(
				education.getDegree(), education.getInstitution(), education.getGraduationYear()
			))
			.orElse(new Practitioner.Education());
	}
	
	// ---------------------------------------------------------------- //
	
	public void updateDoctor(Doctor prevDoctor, Doctor currDoctor) {
		EntityUpdater.updateNonNullProperties(currDoctor, prevDoctor);
	}
}
