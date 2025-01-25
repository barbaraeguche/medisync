package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Nurse;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Practitioner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class NurseFactory {
	public Nurse createNurse(User user, Practitioner practitioner, Nurse.Shift shift, List<Nurse.Certifications> certifications) {
		return new Nurse(user, practitioner, shift, certifications);
	}
	
	public Nurse.Certifications createCertifications(String name, String issuingBody, LocalDate expirationDate) {
		return new Nurse.Certifications(name, issuingBody, expirationDate);
	}
}
