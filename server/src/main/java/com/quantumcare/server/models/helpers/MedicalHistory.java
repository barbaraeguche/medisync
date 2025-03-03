package com.quantumcare.server.models.helpers;

import com.quantumcare.server.models.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "medical_history")
public class MedicalHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "medical_history_seq")
	@SequenceGenerator(name = "medical_history_seq", sequenceName = "medical_history_seq", allocationSize = 1)
	private Long _id;
	
	@NonNull
	@Column(name = "patient_id", nullable = false)
	private UUID patientId;
	
	@NonNull
	private String diagnosis;
	
	@NonNull
	private LocalDate diagnosisDate;
	
	@ElementCollection
	@CollectionTable(name = "medications", joinColumns = @JoinColumn(name = "medical_history_id"))
	private List<Medications> medications;
	
	
	// ------------------------ HELPERS ------------------------ //
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Medications {
		private String drugName, dosage, frequency, duration;
	}
	// ---------------------- END HELPERS ---------------------- //
}
