package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.Practitioner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class HelperFactory {
  public Practitioner createPractitioner(Practitioner reqPractitioner) {
		return new Practitioner(
			reqPractitioner.getLicenseNumber(), reqPractitioner.getSpecialization(), reqPractitioner.getLanguages()
		);
	}
	
	public Practitioner.Education createEducation(String degree, String institution, String graduationYear) {
		return new Practitioner.Education(
			degree, institution, graduationYear
		);
	}
	
//	public Appointments createAppointment(LocalDate day, LocalTime startTime, LocalTime endTime, Appointments.Type type,
//																				Appointments.Status status, String notes, Doctor doctorId, Patient patientId
//	) {
//    return new Appointments(day, startTime, endTime, type, status, notes, doctorId, patientId);
//  }
	
	// ---------------------------------------------------------------- //
	
	public void updatePractitioner(Practitioner prevPractitioner, Practitioner currPractitioner) {
    prevPractitioner.setSpecialization(currPractitioner.getSpecialization());
		prevPractitioner.setYearsOfExperience(currPractitioner.getYearsOfExperience());
    prevPractitioner.setLanguages(currPractitioner.getLanguages());
    
    // update education
    updateEducation(prevPractitioner, currPractitioner);
	}
	
	public void updateEducation(Practitioner prevPractitioner, Practitioner currPractitioner) {
		List<Practitioner.Education> prevEducation = prevPractitioner.getEducation();
		List<Practitioner.Education> currEducation = currPractitioner.getEducation();
		
		prevPractitioner.setEducation(currPractitioner.getEducation());
  }
	
	// ---------------------------------------------------------------- //
	
	public void deleteEducation(Practitioner reqPractitioner, String degree, String institution, String graduationYear) {
		reqPractitioner.getEducation().removeIf(educ ->
			educ.getDegree().equalsIgnoreCase(degree) &&
				educ.getInstitution().equalsIgnoreCase(institution) &&
				educ.getGraduationYear().equalsIgnoreCase(graduationYear)
		);
	}
}
