package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.Practitioner;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "doctor")
@NoArgsConstructor
@RequiredArgsConstructor
public class Doctor {

	@Id
	@Column(name = "user_id")
	private UUID id;
	
	@MapsId
	@NonNull
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@NonNull
	@OneToOne
	@JoinColumn(name = "practitioner_id", nullable = false)
	private Practitioner practitioner;
	
	@ElementCollection
	@CollectionTable(name = "doctor_availabilities", joinColumns = @JoinColumn(name = "doctor_id"))
	private List<DoctorAvailabilities> doctorAvailabilities;
	
	@OneToMany(mappedBy = "doctorId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Appointments> appointments;
	
	
	// ------------------------ HELPERS ------------------------ //
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class DoctorAvailabilities {
		private LocalDate day;
		private LocalTime startTime, endTime;
	}
	// ---------------------- END HELPERS ---------------------- //
}
