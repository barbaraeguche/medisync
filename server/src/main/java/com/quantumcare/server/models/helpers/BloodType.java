package com.quantumcare.server.models.helpers;

public enum BloodType {
	a_plus("A+"), a_minus("A-"), b_plus("B+"), b_minus("B-"), ab_plus("AB+"), ab_minus("AB-"), o_plus("O+"), o_minus("O-");
	
	private final String bloodType;
	
	BloodType(String bloodType) {
		this.bloodType = bloodType;
	}
	
	public String displayBloodType() {
		return this.bloodType;
	}
}
