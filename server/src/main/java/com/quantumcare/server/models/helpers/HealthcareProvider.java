package com.quantumcare.server.models.helpers;

import java.util.List;

//@Entity
//@Table(name = "healthcare_provider")
//@NotNull
public class HealthcareProvider {

//	@Column(unique = true)
	String licenseNumber;
	
	List<String> specialization;
	
	//	@Column(nullable = false)
//
//	@ElementCollection
//	@CollectionTable(name = "education", joinColumns = @JoinColumn(name = "doctor_id"))
//	Set<Education> education;
//
//	@Column(nullable = false)
//	private int yearsOfExperience;
//
//	@Column(nullable = false)
//	private String department;
	
	
	// ------------------------ HELPERS ------------------------ //
	//inner class
	private static class Education {
		private String degree, institution;
		private int yearOfGraduation;
		
		public String getDegree() { return this.degree; }
		public void setDegree(String degree) {
			this.degree = degree;
		}
		
		public String getInstitution() { return this.institution; }
		public void setInstitution(String institution) {
			this.institution = institution;
		}
		
		public int getYearOfGraduation() { return this.yearOfGraduation; }
		public void setYearOfGraduation(int yearOfGraduation) {
			this.yearOfGraduation = yearOfGraduation;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
