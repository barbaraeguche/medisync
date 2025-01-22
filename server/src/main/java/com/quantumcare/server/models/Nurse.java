package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.MedicalProfessional;
//import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

//@Entity
//@Table(name = "nurse")
public class Nurse extends User {
	
	// join on nurseId foreign key
	MedicalProfessional medicalProfessional;
	
//	@Column(nullable = false)
//	@Enumerated(EnumType.STRING)
	Shift shift;
	
//	@Embedded
	private Certifications certifications;
	
//	@Column(nullable = false)
	private List<String> languages;
	
	
	// ------------------------ HELPERS ------------------------ //
	// enum
	private enum Shift {
		morning, afternoon, evening
  }
	
	// inner class
	private static class Certifications {
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
