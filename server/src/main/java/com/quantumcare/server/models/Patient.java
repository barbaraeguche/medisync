package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.MedicalHistory;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "patient")
@NoArgsConstructor
@RequiredArgsConstructor
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_seq")
	@SequenceGenerator(name = "patient_seq", sequenceName = "patient_seq", allocationSize = 1)
	private Integer id;
	
	@NonNull
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@NonNull
	@Column(name = "allergies")
	private String allergies;
	
	@NonNull
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private BloodType bloodType;
	
	@NonNull
	private String insuranceProvider, insurancePolicyNumber;
	
	@OneToMany(mappedBy = "patientId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Appointments> appointments;

	@OneToMany(mappedBy = "patientId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MedicalHistory> medicalHistory;
	
	@NonNull
	@Embedded
	@Column(nullable = false)
	private HealthMetrics healthMetrics;
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum BloodType {
		a_plus("A+"), a_minus("A-"), b_plus("B+"), b_minus("B-"),
		ab_plus("AB+"), ab_minus("AB-"), o_plus("O+"), o_minus("O-");
		
		private final String bloodType;
		
		BloodType(String bloodType) { this.bloodType = bloodType; }
		public String displayBloodType() { return this.bloodType; }
	}
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class HealthMetrics {
		private double height, weight, bloodSugar;
		private String bloodPressure;
	}
	// ---------------------- END HELPERS ---------------------- //
}
