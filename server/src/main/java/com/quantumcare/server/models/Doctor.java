package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.PractitionerDetails;
//import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

//@Entity
//@Table(name = "doctor")
public class Doctor {

//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
//	@OneToOne
//	@JoinColumn(name = "userId", nullable = false)
	User user;
	
//	@OneToOne
//	@JoinColumn(name = "doctorPractitionerId", nullable = false)
	PractitionerDetails practitionerDetails;
	
//	@Embedded --- MAY CHANGE TO ELEMENT COLLECTION
	List<Availability> availableHours;
	
//	@Column(nullable = false)
	private List<String> languages;
	
	// getters and setters
	public int getId() { return this.id; }
	public void setId(int id) {
		this.id = id;
	}
	
	public User getUser() { return this.user; }
	public void setUser(User user) {
		this.user = user;
	}
	
	public PractitionerDetails getPractitionerDetails() { return this.practitionerDetails; }
	public void setPractitionerDetails(PractitionerDetails practitionerDetails) {
		this.practitionerDetails = practitionerDetails;
	}
	
	public List<Availability> getAvailableHours() { return this.availableHours; }
	public void setAvailableHours(List<Availability> availableHours) {
		this.availableHours = availableHours;
	}
	
	public List<String> getLanguages() { return this.languages; }
	public void setLanguages(List<String> languages) {
		this.languages = languages;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
//	@Embeddable
	public static class Availability {
		private LocalDate day;
		private LocalTime startTime, endTime;
		
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
	}
	// ---------------------- END HELPERS ---------------------- //
}
