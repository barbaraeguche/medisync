package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.Practitioner;
//import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

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
//	@JoinColumn(name = "practitionerId", nullable = false)
	Practitioner practitioner;
	
//	@ElementCollection
//	@CollectionTable(name = "doctor_availabilities", joinColumns = @JoinColumn(name = "doctorId"))
	List<DoctorAvailabilities> doctorAvailabilities;
	
//	@OneToMany(mappedBy = "doctorId", cascade = CascadeType.ALL, orphanRemoval = true)
	Appointments appointments;
	
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
	
	public Practitioner getPractitionerDetails() { return this.practitioner; }
	public void setPractitionerDetails(Practitioner practitioner) {
		this.practitioner = practitioner;
	}
	
	public List<DoctorAvailabilities> getDoctorAvailabilities() { return this.doctorAvailabilities; }
	public void setDoctorAvailabilities(List<DoctorAvailabilities> doctorAvailabilities) {
		this.doctorAvailabilities = doctorAvailabilities;
	}
	
	public List<String> getLanguages() { return this.languages; }
	public void setLanguages(List<String> languages) {
		this.languages = languages;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
//	@Embeddable
	public static class DoctorAvailabilities {
		private LocalDate day;
		
		private Set<LocalTime> startTime, endTime;
		
		public LocalDate getDay() { return this.day; }
		public void setDay(LocalDate day) {
			this.day = day;
		}
		
		public Set<LocalTime> getStartTime() { return this.startTime; }
		public void setStartTime(Set<LocalTime> startTime) {
			this.startTime = startTime;
		}
		
		public Set<LocalTime> getEndTime() { return this.endTime; }
		public void setEndTime(Set<LocalTime> endTime) {
			this.endTime = endTime;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
