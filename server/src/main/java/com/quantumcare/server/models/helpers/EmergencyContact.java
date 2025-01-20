package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;

@Embeddable
public class EmergencyContact {
	
	private String name, relationship, email;
}
