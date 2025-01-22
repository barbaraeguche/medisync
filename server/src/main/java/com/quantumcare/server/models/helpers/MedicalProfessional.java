package com.quantumcare.server.models.helpers;

import java.util.List;
import java.util.Set;

//@Entity
//@Table(name = "healthcare_provider")
public class MedicalProfessional {

//	@Column(unique = true, nullable = false, updatable = false)
	String licenseNumber;
	
//	@Column(nullable = false)
	List<String> specialization;
	
//  @Embedded
	Set<Education> education;
	
	int yearsOfExperience;
	String department;
	
	
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
