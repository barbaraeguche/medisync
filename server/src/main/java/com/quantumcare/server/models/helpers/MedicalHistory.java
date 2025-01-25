package com.quantumcare.server.models.helpers;

import com.quantumcare.server.models.Patient;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "medical_history")
public class MedicalHistory {

	@Id
	@SequenceGenerator(name = "medical_history_seq", sequenceName = "medical_history_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "medical_history_seq")
	private Integer id;
	
	private String diagnosis;
	private LocalDate diagnosisDate;
	
	@ElementCollection
	@CollectionTable(name = "patient_medications", joinColumns = @JoinColumn(name = "medical_history_id"))
	private List<Medications> medications;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	Patient patientId;
	
	// constructors
	public MedicalHistory() {}
  public MedicalHistory(String diagnosis, LocalDate diagnosisDate, List<Medications> medications, Patient patientId) {
		this.diagnosis = diagnosis;
		this.diagnosisDate = diagnosisDate;
		this.medications = medications;
		this.patientId = patientId;
	}
	
	// getters and setters
	public Integer getId() { return this.id; }
	public void setId(Integer id) {
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
	
	public Patient getPatientId() { return patientId; }
	public void setPatientId(Patient patientId) { this.patientId = patientId; }
	
	
	// ------------------------ HELPERS ------------------------ //
	@Embeddable
	public static class Medications {
		private String drugName, dosage, frequency, duration;
		
		// constructors
		public Medications() {}
		public Medications(String drugName, String dosage, String frequency, String duration) {
			this.drugName = drugName;
			this.dosage = dosage;
			this.frequency = frequency;
      this.duration = duration;
		}
		
		// getters and setters
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
