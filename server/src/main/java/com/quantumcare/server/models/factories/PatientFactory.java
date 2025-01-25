package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.MedicalHistory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class PatientFactory {
  public Patient createPatient(User user, List<String> allergies, Patient.BloodType bloodType, String insuranceProvider,
															 String insurancePolicyNumber, List<Appointments> appointments, List<MedicalHistory> medicalHistory,
															 Patient.HealthMetrics healthMetrics
	) {
		return new Patient(user, allergies, bloodType, insuranceProvider, insurancePolicyNumber, appointments, medicalHistory, healthMetrics);
	}
	
	public MedicalHistory createMedicalHistory(String diagnosis, LocalDate diagnosisDate,
																						 List<MedicalHistory.Medications> medications, Patient patientId
	) {
		return new MedicalHistory(diagnosis, diagnosisDate, medications, patientId);
	}
	
	public MedicalHistory.Medications createMedications(String drugName, String dosage, String frequency, String duration) {
		return new MedicalHistory.Medications(drugName, dosage, frequency, duration);
  }
	
	public Patient.HealthMetrics createHealthMetrics(double height, double weight, String bloodPressure, double bloodSugar) {
    return new Patient.HealthMetrics(height, weight, bloodPressure, bloodSugar);
  }
}
