package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.MedicalHistory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class PatientFactory {
  public Patient createPatient(User user, String allergies, Patient.BloodType bloodType, String insuranceProvider,
															 String insurancePolicyNumber, Patient.HealthMetrics healthMetrics
	) {
		return new Patient(user, allergies, bloodType, insuranceProvider, insurancePolicyNumber, healthMetrics);
	}
	
	public MedicalHistory createMedicalHistory(String diagnosis, LocalDate diagnosisDate, Patient patientId) {
		return new MedicalHistory(diagnosis, diagnosisDate, patientId);
	}
	
	public MedicalHistory.Medications createMedications(String drugName, String dosage, String frequency, String duration) {
		return new MedicalHistory.Medications(drugName, dosage, frequency, duration);
  }
	
	public Patient.HealthMetrics createHealthMetrics(double height, double weight, String bloodPressure, double bloodSugar) {
    return new Patient.HealthMetrics(height, weight, bloodPressure, bloodSugar);
  }
}
