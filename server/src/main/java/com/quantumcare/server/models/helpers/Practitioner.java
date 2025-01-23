package com.quantumcare.server.models.helpers;

import java.util.Set;

//@Entity
//@Table(name = "practitioner_details")
public class Practitioner {

//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
//	@Column(updatable = false, unique = true, nullable = false)
	String licenseNumber;
	
//	@Column(nullable = false)
	Set<String> department, specialization;
	
//	@ElementCollection
//	@CollectionTable(name = "education", joinColumns = @JoinColumn(name = "practitionerId"))
	Set<Education> education;
	
	int yearsOfExperience;
	
	//getters and setters
	public int getId() { return this.id; }
	public void setId(int id) {
		this.id = id;
	}
	
	public String getLicenseNumber() { return this.licenseNumber; }
	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}
	
	public Set<String> getDepartment() { return this.department; }
	public void setDepartment(Set<String> department) {
		this.department = department;
	}
	
	public Set<String> getSpecialization() { return this.specialization; }
	public void setSpecialization(Set<String> specialization) {
		this.specialization = specialization;
	}
	
	public Set<Education> getEducation() { return this.education; }
	public void setEducation(Set<Education> education) {
		this.education = education;
	}
	
	public int getYearsOfExperience() { return this.yearsOfExperience; }
	public void setYearsOfExperience(int yearsOfExperience) {
		this.yearsOfExperience = yearsOfExperience;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
//	@Embeddable
	public static class Education {
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
