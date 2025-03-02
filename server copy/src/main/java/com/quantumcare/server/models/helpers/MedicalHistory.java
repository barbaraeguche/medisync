package com.quantumcare.server.models.helpers;

import com.quantumcare.server.models.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "medical_history")
@NoArgsConstructor
@RequiredArgsConstructor
public class MedicalHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "medical_history_seq")
	@SequenceGenerator(name = "medical_history_seq", sequenceName = "medical_history_seq", allocationSize = 1)
	private Integer id;
	
	@NonNull
	private String diagnosis;
	
	@NonNull
	private LocalDate diagnosisDate;
	
	@ElementCollection
	@CollectionTable(name = "patient_medications", joinColumns = @JoinColumn(name = "medical_history_id"))
	private List<Medications> medications;
	
	@NonNull
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patientId;
	
	
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
