package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.Practitioner;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "nurse")
public class Nurse {

	@Id
	@SequenceGenerator(name = "nurse_seq", sequenceName = "nurse_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nurse_seq")
	private Integer id;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	User user;
	
	@OneToOne
	@JoinColumn(name = "practitioner_id", nullable = false)
	Practitioner practitioner;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	Shift shift;
	
	@ElementCollection
	@CollectionTable(name = "nurse_certifications", joinColumns = @JoinColumn(name = "nurse_id"))
	private List<Certifications> certifications;
	
	// constructors
	public Nurse() {}
	public Nurse(User user, Practitioner practitioner, Shift shift, List<Certifications> certifications) {
		this.user = user;
		this.practitioner = practitioner;
		this.shift = shift;
		this.certifications = certifications;
	}
	
	// getters and setters
	public Integer getId() { return this.id; }
	public void setId(Integer id) { this.id = id; }
	
	public User getUser() { return this.user; }
	public void setUser(User user) { this.user = user; }
	
	public Practitioner getPractitionerDetails() { return this.practitioner; }
	public void setPractitionerDetails(Practitioner practitioner) { this.practitioner = practitioner; }
	
	public Shift getShift() { return this.shift; }
	public void setShift(Shift shift) { this.shift = shift; }
	
	public List<Certifications> getCertifications() { return this.certifications; }
	public void setCertifications(List<Certifications> certifications) { this.certifications = certifications; }
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum Shift { morning, afternoon, evening; }
	
	@Embeddable
	public static class Certifications {
		private String name, issuingBody;
		private LocalDate expirationDate;
		
		// constructors
		public Certifications() {}
		public Certifications(String name, String issuingBody, LocalDate expirationDate) {
      this.name = name;
      this.issuingBody = issuingBody;
      this.expirationDate = expirationDate;
    }
		
		// getters and setters
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
