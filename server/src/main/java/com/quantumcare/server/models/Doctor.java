package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.Practitioner;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "doctor")
@RequiredArgsConstructor
public class Doctor {
	
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
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "practitioner_id", nullable = false)
	@NotNull(message = "Practitioner details must be provided")
	private Practitioner practitioner;
	
	@ElementCollection
	@OrderBy("date, startTime, endTime")
	@CollectionTable(name = "availabilities", joinColumns = @JoinColumn(name = "doctor_id"))
	private List<Availabilities> availabilities;
	
	@OrderBy("date, time")
	@OneToMany(mappedBy = "doctorId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Appointments> appointments;
	
	
	// ------------------------ HELPERS ------------------------ //
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Availabilities {
		private LocalDate date;
		private String startTime, endTime;
	}
	// ---------------------- END HELPERS ---------------------- //
}
