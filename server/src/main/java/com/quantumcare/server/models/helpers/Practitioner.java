package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "practitioner")
public class Practitioner {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(updatable = false, unique = true, nullable = false)
	String licenseNumber;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_department", joinColumns = @JoinColumn(name = "practitionerId"))
	@Column(name = "department", nullable = false)
	Set<String> department;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_specialization", joinColumns = @JoinColumn(name = "practitionerId"))
	@Column(name = "specialization", nullable = false)
	Set<String> specialization;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_education", joinColumns = @JoinColumn(name = "practitionerId"))
	@Column(name = "education", nullable = false)
	Set<Education> education;
	
	int yearsOfExperience;
	
	//getters and setters
	public Integer getId() { return this.id; }
	public void setId(Integer id) {
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
	@Embeddable
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
