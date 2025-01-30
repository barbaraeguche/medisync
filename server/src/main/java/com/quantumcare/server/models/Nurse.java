package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Practitioner;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "nurse")
@NoArgsConstructor
@RequiredArgsConstructor
public class Nurse {

	@Id
	@Column(name = "user_id")
	private UUID id;
	
	@MapsId
	@NonNull
	@OneToOne
	@NotNull(message = "Basic details must be provided")
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@NonNull
	@OneToOne
	@NotNull(message = "Practitioner details must be provided")
	@JoinColumn(name = "practitioner_id", nullable = false)
	private Practitioner practitioner;
	
	@NonNull
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@NotNull(message = "Preferred shift must be specified")
	private Shift shift;
	
	@ElementCollection
	@CollectionTable(name = "nurse_certifications", joinColumns = @JoinColumn(name = "nurse_id"))
	private List<Certifications> certifications;
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum Shift { morning, afternoon, evening }
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Certifications {
		private String name, issuingBody;
		private LocalDate expirationDate;
	}
	// ---------------------- END HELPERS ---------------------- //
}
