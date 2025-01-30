package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Nurse;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Practitioner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class NurseFactory {
	// create a new instance
	public Nurse createNurse(User user, Practitioner practitioner, Nurse nurse) {
		return new Nurse(
			user, practitioner, nurse.getShift()
		);
	}
	
	public Nurse.Certifications createCertifications(String name, String issuingBody, LocalDate expirationDate) {
		return new Nurse.Certifications(name, issuingBody, expirationDate);
	}
	
	// update instance
	public void updateNurse(Nurse prevNurse, Nurse currNurse) {
    prevNurse.setShift(currNurse.getShift());
		
		// update the certifications
		updateCertifications(prevNurse, currNurse);
  }
	
	public void updateCertifications(Nurse prevNurse, Nurse currNurse) {
//		List<Nurse.Certifications> prevCertifications = prevNurse.getCertifications();
//    List<Nurse.Certifications> currCertifications = currNurse.getCertifications();
    
		prevNurse.setCertifications(currNurse.getCertifications());
  }
}
