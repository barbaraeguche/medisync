package com.medisync.server.factories;

import com.medisync.server.utilities.EntityUpdater;
import com.medisync.server.models.Patient;
import com.medisync.server.models.User;
import org.springframework.stereotype.Component;

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
			.map((metrics) -> new Patient.HealthMetrics(
        metrics.getHeight(), metrics.getWeight(), metrics.getHeartRate()
      ))
      .orElse(new Patient.HealthMetrics());
	}
	
	// ---------------------------------------------------------------- //
	
	public void updatePatient(Patient prevPatient, Patient currPatient) {
		EntityUpdater.updateNonNullProperties(currPatient, prevPatient);
	}
}
