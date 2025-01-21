package com.quantumcare.server.models.helpers;

import jakarta.persistence.*;

@Embeddable
public class Address {
	
	private String street, city, state, zipCode, country;
}
