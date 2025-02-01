package com.quantumcare.server.models;

import com.fasterxml.jackson.annotation.JsonValue;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.MedicalHistory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "patient")
@NoArgsConstructor
@RequiredArgsConstructor
public class Patient {

	@Id
	@Column(name = "user_id")
	private UUID id;
	
	@MapsId
	@NonNull
	@OneToOne(cascade = CascadeType.ALL)
	@NotNull(message = "Basic details must be provided")
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@NonNull
	@Column(name = "allergies")
	private String allergies;
	
	@NonNull
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@NotNull(message = "BloodType must be specified")
	private BloodType bloodType;
	
	private String insuranceProvider = "", insurancePolicyNumber = "";
	
	@OneToMany(mappedBy = "patientId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Appointments> appointments;

	@OneToMany(mappedBy = "patientId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MedicalHistory> medicalHistory;
	
	@NonNull
	@Embedded
	@Column(nullable = false)
	@NotNull(message = "HealthMetrics must be specified")
	private HealthMetrics healthMetrics;
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum BloodType {
		a_plus("A+"), a_minus("A-"), b_plus("B+"), b_minus("B-"),
		ab_plus("AB+"), ab_minus("AB-"), o_plus("O+"), o_minus("O-");
		
		private final String bloodType;
		
		BloodType(String bloodType) { this.bloodType = bloodType; }
		
		@JsonValue
		public String displayBloodType() { return this.bloodType; }
	}
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class HealthMetrics {
		private double height = 0.0, weight = 0.0, bloodSugar = 0.0;
		private String bloodPressure = "";
	}
	// ---------------------- END HELPERS ---------------------- //
}
