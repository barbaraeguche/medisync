package com.quantumcare.server.models;

import com.fasterxml.jackson.annotation.JsonValue;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.MedicalHistory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "patients")
public class Patient {
	
	@Id
	@Column(name = "user_id")
	private UUID _id;
	
	@MapsId
	@NonNull
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = false)
	@NotNull(message = "Basic details must be provided")
	private User user;
	
	@NonNull
	@NotNull(message = "Date of birth must be provided")
	private LocalDate dateOfBirth;
	
	@NonNull
	private String allergies;
	
	@NonNull
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@NotNull(message = "BloodType must be specified")
	private BloodType bloodType;
	
	private String insuranceProvider = "", insurancePolicyNumber = "";
	
	@NonNull
	private String chronicConditions;
	
	@NonNull
	@Embedded
	private HealthMetrics healthMetrics;
	
	@OrderBy("diagnosisDate desc, _id")
	@OneToMany(mappedBy = "patientId", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MedicalHistory> medicalHistory;
	
	@OrderBy("date, time")
	@OneToMany(mappedBy = "patientId", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Appointments> appointments;
	
	
	// ------------------------ HELPERS ------------------------ //
	private enum BloodType {
		A_POS("A+"), A_NEG("A-"), B_POS("B+"), B_NEG("B-"),
		AB_POS("AB+"), AB_NEG("AB-"), O_POS("O+"), O_NEG("O-");
		
		private final String bloodType;
		
		BloodType(String bloodType) {
			this.bloodType = bloodType;
		}
		
		@JsonValue
		public String getBloodType() {
			return this.bloodType;
		}
	}
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class HealthMetrics {
		private double height = 0, weight = 0, heartRate = 0;
	}
// ---------------------- END HELPERS ---------------------- //
}
