package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "medical_history")
public class MedicalHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String diagnosis;
	private LocalDate diagnosisDate;
	
	@ElementCollection
	@CollectionTable(name = "medications", joinColumns = @JoinColumn(name = "medicalHistoryId"))
	private List<Medications> medications;
	
	// getters and setters
	public int getId() { return this.id; }
	public void setId(int id) {
		this.id = id;
	}
	
	public String getDiagnosis() { return this.diagnosis; }
	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}
	
	public LocalDate getDiagnosisDate() { return this.diagnosisDate; }
	public void setDiagnosisDate(LocalDate diagnosisDate) {
		this.diagnosisDate = diagnosisDate;
	}
	
	public List<Medications> getMedications() { return this.medications; }
	public void setMedications(List<Medications> medications) {
		this.medications = medications;
	}
	
	// ------------------------ HELPERS ------------------------ //
	@Embeddable
	public static class Medications {
		private String drugName, dosage, frequency, duration;
		
		public String getDrugName() { return this.drugName; }
		public void setDrugName(String drugName) {
			this.drugName = drugName;
		}
		
		public String getDuration() { return this.duration; }
		public void setDuration(String duration) {
			this.duration = duration;
		}
		
		public String getDosage() { return this.dosage; }
		public void setDosage(String dosage) {
			this.dosage = dosage;
		}
		
		public String getFrequency() { return this.frequency; }
		public void setFrequency(String frequency) {
			this.frequency = frequency;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
