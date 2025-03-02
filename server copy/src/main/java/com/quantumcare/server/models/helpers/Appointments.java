package com.quantumcare.server.models.helpers;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "appointments")
@NoArgsConstructor
@RequiredArgsConstructor
public class Appointments {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "appointments_seq")
	@SequenceGenerator(name = "appointments_seq", sequenceName = "appointments_seq", allocationSize = 1)
	private Integer id;
	
	@NonNull
	@Column(nullable = false)
	private LocalDate day;
	
	@NonNull
	@Column(nullable = false)
	private LocalTime startTime, endTime;
	
	@NonNull
	@Column(nullable = false)
	private Type type;
	
	@NonNull
	@Column(nullable = false)
	private Status status;
	
	@NonNull
	private String notes;
	
	@NonNull
	@ManyToOne
  @JoinColumn(name = "doctor_id", nullable = false)
	private Doctor doctorId;
	
	@NonNull
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patientId;
	
	
	// ------------------------ HELPERS ------------------------ //
	// must have previous appointment for there to be a followUp --- checkup + followUp + consultation(30min), emergency (1h)
	public enum Type { checkup, followUp, emergency, consultation }
	public enum Status { scheduled, completed, cancelled }
	// ---------------------- END HELPERS ---------------------- //
}
