package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Entity
@Table(name = "practitioner")
@NoArgsConstructor
@RequiredArgsConstructor
public class Practitioner {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "practitioner_seq")
	@SequenceGenerator(name = "practitioner_seq", sequenceName = "practitioner_seq", allocationSize = 1)
	private Long _id;
	
	@NonNull
	@Column(unique = true, nullable = false)
	@NotEmpty(message = "License number must be provided")
	private String licenseNumber;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Specialization must be provided")
	private String specialization;
	
	@NonNull
	private Integer yearsOfExperience;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Spoken languages must be provided")
	private String languages;
	
	@NonNull
	@Embedded
	private Education education;
	
	
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
