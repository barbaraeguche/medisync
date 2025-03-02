package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "practitioner")
@NoArgsConstructor
@RequiredArgsConstructor
public class Practitioner {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "practitioner_seq")
	@SequenceGenerator(name = "practitioner_seq", sequenceName = "practitioner_seq", allocationSize = 1)
	private Long id;
	
	@NonNull
	@Column(updatable = false, unique = true, nullable = false)
	@NotEmpty(message = "License number must be provided")
	private String licenseNumber;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Specialization must be provided")
	private String specialization;
	
	private Integer yearsOfExperience = 0;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Spoken languages must be provided")
	private String languages;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_education", joinColumns = @JoinColumn(name = "practitioner_id"))
	private List<Education> education;
	
	
	// ------------------------ HELPERS ------------------------ //
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Education {
		private String degree = "", institution = "", graduationYear = "";
	}
	// ---------------------- END HELPERS ---------------------- //
}
