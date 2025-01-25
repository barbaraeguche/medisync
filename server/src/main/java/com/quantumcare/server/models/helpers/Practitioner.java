package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "practitioner")
public class Practitioner {

	@Id
	@SequenceGenerator(name = "practitioner_seq", sequenceName = "practitioner_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "practitioner_seq")
	private Integer id;
	
	@Column(updatable = false, unique = true, nullable = false)
	String licenseNumber;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_department", joinColumns = @JoinColumn(name = "practitioner_id"))
	@Column(name = "department", nullable = false)
	Set<String> department;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_specialization", joinColumns = @JoinColumn(name = "practitioner_id"))
	@Column(name = "specialization", nullable = false)
	Set<String> specialization;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_education", joinColumns = @JoinColumn(name = "practitioner_id"))
	@Column(nullable = false)
	Set<Education> education;
	
	int yearsOfExperience;
	
	@ElementCollection
	@CollectionTable(name = "practitioner_languages", joinColumns = @JoinColumn(name = "practitioner_id"))
	@Column(name = "languages", nullable = false)
	private List<String> languages;
	
	// constructors
	public Practitioner() {}
	public Practitioner(String licenseNumber, Set<String> department, Set<String> specialization,
											Set<Education> education, int yearsOfExperience, List<String> languages
	) {
		this.licenseNumber = licenseNumber;
		this.department = department;
		this.specialization = specialization;
		this.education = education;
		this.yearsOfExperience = yearsOfExperience;
		this.languages = languages;
	}
	
	// getters and setters
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
	
	public List<String> getLanguages() { return this.languages; }
	public void setLanguages(List<String> languages) { this.languages = languages; }
	
	
	// ------------------------ HELPERS ------------------------ //
	@Embeddable
	public static class Education {
		private String degree, institution;
		private int graduationYear;
		
		// constructors
		public Education() {}
		public Education(String degree, String institution, int graduationYear) {
      this.degree = degree;
      this.institution = institution;
      this.graduationYear = graduationYear;
    }
		
		// getters and setters
		public String getDegree() { return this.degree; }
		public void setDegree(String degree) {
			this.degree = degree;
		}
		
		public String getInstitution() { return this.institution; }
		public void setInstitution(String institution) {
			this.institution = institution;
		}
		
		public int getGraduationYear() { return this.graduationYear; }
		public void setGraduationYear(int graduationYear) {
			this.graduationYear = graduationYear;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
