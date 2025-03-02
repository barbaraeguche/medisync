package com.quantumcare.server.models;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Data
@Entity
@Table(name = "\"user\"")
@NoArgsConstructor
@RequiredArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID _id;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "First name must be provided")
	private String firstName;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Last name must be provided")
	private String lastName;
	
	@NonNull
	@Column(unique = true, nullable = false)
	@NotEmpty(message = "Email must be provided")
	private String email;
	
	@NonNull
	@Column(nullable = false)
	@NotEmpty(message = "Password must be provided")
	private String password;
	
	@Column(unique = true)
	private String phoneNumber = "";
	
	@NonNull
	@Enumerated(EnumType.STRING)
	@Column(updatable = false, nullable = false)
	@NotNull(message = "Gender must be specified")
	private Gender gender;
	
	@NonNull
	@Enumerated(EnumType.STRING)
	@NotNull(message = "Role must be specified")
	@Column(updatable = false, nullable = false)
	private Role role;
	
	@NonNull
	@Embedded
	private Address address;
	
	@NonNull
	@Embedded
	private EmergencyContact emergencyContact;
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum Gender { Male, Female };
	public enum Role { Admin, Doctor, Patient };
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Address {
		private enum Province {
			AB("Alberta"), BC("British Columbia"), MB("Manitoba"), NB("New Brunswick"), NL("Newfoundland and Labrador"),
			NS("Nova Scotia"), NT("Northwest Territories"), NU("Nunavut"), ON("Ontario"), PE("Prince Edward Island"),
			QC("Quebec"), SK("Saskatchewan"), YT("Yukon");
			
			private final String province;
			
			Province(String province) {
				this.province = province;
			}
			
			@JsonValue
			public String getProvince() {
				return this.province;
			}
		}
		
		private String street = "", city = "", postalCode = "", country = "Canada";
		
		@Enumerated(EnumType.STRING)
		Province province = Province.QC;
	}
	
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class EmergencyContact {
		@Column(name = "contactName")
		private String name = "";
		
		private String relationship = "";
		
		@Column(name = "contactEmail")
		private String email = "";
	}
	// ---------------------- END HELPERS ---------------------- //
}
