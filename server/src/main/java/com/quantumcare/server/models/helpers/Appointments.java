package com.quantumcare.server.models.helpers;

import com.fasterxml.jackson.annotation.JsonValue;
import com.quantumcare.server.models.Doctor;
//import com.quantumcare.server.models.Patient;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "appointments")
public class Appointments {
	
	@Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "appointments_seq")
  @SequenceGenerator(name = "appointments_seq", sequenceName = "appointments_seq", allocationSize = 1)
  private Long _id;
	
	@NonNull
	@ManyToOne
	@JoinColumn(name = "doctor_id", nullable = false)
	Doctor doctorId;
	
//	@NonNull
//	@ManyToOne
//	@JoinColumn(name = "patient_id", nullable = false)
//	Patient patientId;
	
	@NonNull
	@Column(nullable = false)
	LocalDate date;
	
	@NonNull
	@Column(nullable = false)
	private LocalTime time;
	
	@NonNull
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@NotNull(message = "Appointment type must be specified")
	private Type type;
	
	@NonNull
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@NotNull(message = "Appointment status must be specified")
	private Status status;
	
	private String notes = "";
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum Type {
		consultation("Consultation"), checkup("Checkup"), followUp("Follow Up"), emergency("Emergency");
		
		private final String type;
		
		Type(String type) {
			this.type = type;
		}
		
		@JsonValue
		public String getType() {
      return this.type;
    }
	}
	
	public enum Status {
		Scheduled, Completed, Cancelled
	}
	// ---------------------- END HELPERS ---------------------- //
}
