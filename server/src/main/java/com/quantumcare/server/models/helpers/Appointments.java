package com.quantumcare.server.models.helpers;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

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
	@Column(name = "doctor_id", nullable = false)
	private UUID doctorId;
	
	@NonNull
	@Column(name = "patient_id", nullable = false)
	private UUID patientId;
	
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
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Status status = Status.Scheduled;
	
	@NonNull
	private String noteToDoctor = "";
	@NonNull
	private String statusNote = "";
	
	
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
