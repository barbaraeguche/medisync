package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.MedicalHistory;
import jakarta.persistence.Embeddable;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "patient")
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@OneToOne
	@JoinColumn(name = "userId", nullable = false)
	User user;
	
	@ElementCollection
	@CollectionTable(name = "patient_allergies", joinColumns = @JoinColumn(name = "patientId"))
	@Column(name = "allergies", nullable = false)
	List<String> allergies;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	BloodType bloodType;
	
	String insuranceProvider, insurancePolicyNumber;
	
	@OneToMany(mappedBy = "patientId", cascade = CascadeType.ALL, orphanRemoval = true)
	List<Appointments> appointments;

	@OneToMany(mappedBy = "patientId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MedicalHistory> medicalHistory;
	
	@Embedded
	@Column(nullable = false)
	HealthMetrics healthMetrics;
	
	//getters and setters
	public Integer getId() { return this.id; }
	public void setId(Integer id) {
		this.id = id;
	}
	
	public User getUser() { return this.user; }
	public void setUser(User user) {
		this.user = user;
	}
	
	public List<String> getAllergies() { return this.allergies; }
	public void setAllergies(List<String> allergies) {
		this.allergies = allergies;
	}
	
	public String getBloodType() { return this.bloodType.displayBloodType(); }
	public void setBloodType(BloodType bloodType) {
		this.bloodType = bloodType;
	}
	
	public String getInsuranceProvider() { return this.insuranceProvider; }
	public void setInsuranceProvider(String insuranceProvider) {
		this.insuranceProvider = insuranceProvider;
	}
	
	public String getInsurancePolicyNumber() { return this.insurancePolicyNumber; }
	public void setInsurancePolicyNumber(String insurancePolicyNumber) {
		this.insurancePolicyNumber = insurancePolicyNumber;
	}
	
	public List<MedicalHistory> getMedicalHistory() { return this.medicalHistory; }
	public void setMedicalHistory(List<MedicalHistory> medicalHistory) {
		this.medicalHistory = medicalHistory;
	}
	
	public HealthMetrics getHealthMetrics() { return this.healthMetrics; }
	public void setHealthMetrics(HealthMetrics healthMetrics) {
		this.healthMetrics = healthMetrics;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum BloodType {
		a_plus("A+"), a_minus("A-"), b_plus("B+"), b_minus("B-"),
		ab_plus("AB+"), ab_minus("AB-"), o_plus("O+"), o_minus("O-");
		
		private final String bloodType;
		
		BloodType(String bloodType) { this.bloodType = bloodType; }
		public String displayBloodType() { return this.bloodType; }
	}
	
	@Embeddable
	public static class HealthMetrics {
		private double height, weight;
		private String bloodPressure;
		private double bloodSugar;
		
		public double getHeight() { return this.height; }
		public void setHeight(double height) {
			this.height = height;
		}
		
		public double getWeight() { return this.weight; }
		public void setWeight(double weight) {
			this.weight = weight;
		}
		
		public String getBloodPressure() { return this.bloodPressure; }
		public void setBloodPressure(String bloodPressure) {
			this.bloodPressure = bloodPressure;
		}
		
		public double getBloodSugar() { return this.bloodSugar; }
		public void setBloodSugar(double bloodSugar) {
			this.bloodSugar = bloodSugar;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
