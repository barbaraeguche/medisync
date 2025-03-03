package com.quantumcare.server.factories;

import com.quantumcare.server.EntityUpdater;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import org.springframework.stereotype.Component;
//import com.quantumcare.server.models.helpers.MedicalHistory;

import java.util.Optional;

@Component
public class PatientFactory {
	public Patient createPatient(User user, Patient reqPatient) {
		return new Patient(
			user, reqPatient.getDateOfBirth(), reqPatient.getAllergies(), reqPatient.getBloodType(),
			reqPatient.getChronicConditions(), createHealthMetrics(reqPatient)
		);
	}
	
	private Patient.HealthMetrics createHealthMetrics(Patient reqPatient) {
		return Optional.ofNullable(reqPatient.getHealthMetrics())
			.map((healthMetrics) -> new Patient.HealthMetrics(
        healthMetrics.getHeight(), healthMetrics.getWeight(), healthMetrics.getHeartRate()
      ))
      .orElse(new Patient.HealthMetrics());
	}
	
//	public MedicalHistory createMedicalHistory() {
//.  todo: come back here
//	}
//
//	public MedicalHistory.Medications createMedications(
//		String drugName, String dosage, String frequency, String duration
//		) {
//		return new MedicalHistory.Medications(
//			drugName, dosage, frequency, duration
//		);
//	}
	
	// ---------------------------------------------------------------- //
	
	public void updatePatient(Patient prevPatient, Patient currPatient) {
		EntityUpdater.updateNonNullProperties(currPatient, prevPatient);
	}
}
