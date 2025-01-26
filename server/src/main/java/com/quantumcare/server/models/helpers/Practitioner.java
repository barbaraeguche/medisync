package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@Entity
@Table(name = "practitioner")
@NoArgsConstructor
@RequiredArgsConstructor
public class Practitioner {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "practitioner_seq")
	@SequenceGenerator(name = "practitioner_seq", sequenceName = "practitioner_seq", allocationSize = 1)
	private Integer id;
	
	@NonNull
	@Column(updatable = false, unique = true, nullable = false)
	private String licenseNumber;
	
	@NonNull
	@Column(name = "department", nullable = false)
	private String department;
	
	@NonNull
	@Column(name = "specialization", nullable = false)
	private String specialization;
	
	@ElementCollection
	@Column(nullable = false)
	@CollectionTable(name = "practitioner_education", joinColumns = @JoinColumn(name = "practitioner_id"))
	private Set<Education> education;
	
	@NonNull
	private Integer yearsOfExperience;
	
	@NonNull
	@Column(name = "languages", nullable = false)
	private String languages;
	
	
	// ------------------------ HELPERS ------------------------ //
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Education {
		private String degree, institution, graduationYear;
	}
	// ---------------------- END HELPERS ---------------------- //
}
