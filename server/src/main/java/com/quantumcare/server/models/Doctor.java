package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.Practitioner;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "doctor")
public class Doctor {

	@Id
	@SequenceGenerator(name = "doctor_seq", sequenceName = "doctor_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doctor_seq")
	private Integer id;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	User user;
	
	@OneToOne
	@JoinColumn(name = "practitioner_id", nullable = false)
	Practitioner practitioner;
	
	@ElementCollection
	@CollectionTable(name = "doctor_availabilities", joinColumns = @JoinColumn(name = "doctor_id"))
	List<DoctorAvailabilities> doctorAvailabilities;
	
	@OneToMany(mappedBy = "doctorId", cascade = CascadeType.ALL, orphanRemoval = true)
	List<Appointments> appointments;
	
	// constructors
	public Doctor() {}
	public Doctor(User user, Practitioner practitioner, List<DoctorAvailabilities> doctorAvailabilities,
								List<Appointments> appointments
	) {
		this.user = user;
		this.practitioner = practitioner;
		this.doctorAvailabilities = doctorAvailabilities;
		this.appointments = appointments;
	}
	
	// getters and setters
	public Integer getId() { return this.id; }
	public void setId(Integer id) {
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
	public void setDoctorAvailabilities(List<DoctorAvailabilities> doctorAvailabilities) { this.doctorAvailabilities = doctorAvailabilities; }
	
	public List<Appointments> getAppointments() { return appointments; }
	public void setAppointments(List<Appointments> appointments) { this.appointments = appointments; }
	
	
	// ------------------------ HELPERS ------------------------ //
	@Embeddable
	public static class DoctorAvailabilities {
		private LocalDate day;
		private LocalTime startTime, endTime;
		
		// constructors
		public DoctorAvailabilities() {}
		public DoctorAvailabilities(LocalDate day, LocalTime startTime, LocalTime endTime) {
			this.day = day;
			this.startTime = startTime;
			this.endTime = endTime;
		}
		
		// getters and setters
		public LocalDate getDay() { return this.day; }
		public void setDay(LocalDate day) { this.day = day; }
		
		public LocalTime getStartTime() { return this.startTime; }
		public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
		
		public LocalTime getEndTime() { return this.endTime; }
		public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
	}
	// ---------------------- END HELPERS ---------------------- //
}
