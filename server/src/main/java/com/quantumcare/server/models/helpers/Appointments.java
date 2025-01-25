package com.quantumcare.server.models.helpers;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.Patient;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
public class Appointments {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(nullable = false)
	private LocalDate day;
	@Column(nullable = false)
	private LocalTime startTime, endTime;
	
	@Column(nullable = false)
	Type type;
	@Column(nullable = false)
	Status status;
	
	String notes;
	
	@ManyToOne
  @JoinColumn(name = "doctor_id", nullable = false)
	Doctor doctorId;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	Patient patientId;
	
	// getters and setters
	public Integer getId() { return this.id; }
	public void setId(Integer id) {
		this.id = id;
	}
	
	public LocalDate getDay() { return this.day; }
	public void setDay(LocalDate day) {
		this.day = day;
	}
	
	public LocalTime getStartTime() { return this.startTime; }
	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}
	
	public LocalTime getEndTime() { return this.endTime; }
	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}
	
	public Type getType() { return this.type; }
	public void setType(Type type) {
		this.type = type;
	}
	
	public Status getStatus() { return this.status; }
	public void setStatus(Status status) {
		this.status = status;
	}
	
	public String getNotes() { return this.notes; }
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	// must have previous appointment for there to be a followUp --- checkup + followUp + consultation(30min), emergency (1h)
	public enum Type { checkup, followUp, emergency, consultation; }
	public enum Status { scheduled, completed, cancelled }
	// ---------------------- END HELPERS ---------------------- //
}
