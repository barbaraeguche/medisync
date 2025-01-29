package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.MedicalHistory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class PatientFactory {
	// create a new instance
	public Patient createPatient(User user, Patient reqPatient) {
		return new Patient(
			user, reqPatient.getAllergies(), reqPatient.getBloodType(), reqPatient.getInsuranceProvider(),
			reqPatient.getInsurancePolicyNumber(), createHealthMetrics(reqPatient)
		);
	}
	
	public MedicalHistory createMedicalHistory(String diagnosis, LocalDate diagnosisDate, Patient patientId) {
		// come back to this after I sort out openai
		return new MedicalHistory(diagnosis, diagnosisDate, patientId);
	}
	
	public MedicalHistory.Medications createMedications(String drugName, String dosage, String frequency, String duration) {
		// come back to this after I sort out openai
		return new MedicalHistory.Medications(drugName, dosage, frequency, duration);
  }
	
	public Patient.HealthMetrics createHealthMetrics(Patient reqPatient) {
		Patient.HealthMetrics healthMetrics = reqPatient.getHealthMetrics();
		
		return new Patient.HealthMetrics(
			healthMetrics.getHeight(), healthMetrics.getWeight(), healthMetrics.getBloodSugar(), healthMetrics.getBloodPressure()
		);
  }
	
	// update instance
	public void updatePatient(Patient prevPatient, Patient currPatient) {
		prevPatient.setAllergies(currPatient.getAllergies());
    prevPatient.setInsuranceProvider(currPatient.getInsuranceProvider());
    prevPatient.setInsurancePolicyNumber(currPatient.getInsurancePolicyNumber());
		
		// update health metrics
    updateHealthMetrics(prevPatient, currPatient);
	}
	
	public void updateHealthMetrics(Patient prevPatient, Patient currPatient) {
		Patient.HealthMetrics prevHealthMetrics = prevPatient.getHealthMetrics();
		Patient.HealthMetrics currHealthMetrics = currPatient.getHealthMetrics();
		
		prevHealthMetrics.setHeight(currHealthMetrics.getHeight());
		prevHealthMetrics.setWeight(currHealthMetrics.getWeight());
		prevHealthMetrics.setBloodSugar(currHealthMetrics.getBloodSugar());
		prevHealthMetrics.setBloodPressure(currHealthMetrics.getBloodPressure());
  }
}
