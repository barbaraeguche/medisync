package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Practitioner;
//import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

//@Entity
//@Table(name = "nurse")
public class Nurse {

//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
//	@OneToOne
//	@JoinColumn(name = "userId", nullable = false)
	User user;
	
//	@OneToOne
//	@JoinColumn(name = "practitionerId", nullable = false)
	Practitioner practitioner;
	
//	@Column(nullable = false)
//	@Enumerated(EnumType.STRING)
	Shift shift;
	
//	@ElementCollection
//	@CollectionTable(name = "certifications", joinColumns = @JoinColumn(name = "nurseId"))
	private List<Certifications> certifications;
	
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
	
	public Shift getShift() { return this.shift; }
	public void setShift(Shift shift) {
		this.shift = shift;
	}
	
	public List<Certifications> getCertifications() { return this.certifications; }
	public void setCertifications(List<Certifications> certifications) {
		this.certifications = certifications;
	}
	
	public List<String> getLanguages() { return this.languages; }
	public void setLanguages(List<String> languages) {
		this.languages = languages;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum Shift { morning, afternoon, evening; }
	
//	@Embeddable
	public static class Certifications {
		private String name, issuingBody;
		private LocalDate expirationDate;
		
		public String getName() { return this.name; }
		public void setName(String name) {
			this.name = name;
		}
		
		public String getIssuingBody() { return this.issuingBody; }
		public void setIssuingBody(String issuingBody) {
			this.issuingBody = issuingBody;
		}
		
		public LocalDate getExpirationDate() { return this.expirationDate; }
		public void setExpirationDate(LocalDate expirationDate) {
			this.expirationDate = expirationDate;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
