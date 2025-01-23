package com.quantumcare.server.models.helpers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public class Appointments {

//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
//	@Column(nullable = false)
	private LocalDate day;
//	@Column(nullable = false)
	private LocalTime startTime, endTime;
	
//	@Column(nullable = false)
	Type type;
//	@Column(nullable = false)
	Status status;
	
	String notes;
	
	// getters and setters
	public int getId() { return this.id; }
	public void setId(int id) {
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
