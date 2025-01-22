package com.quantumcare.server.models.helpers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public class Appointments {

//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	@Column(updatable = false, nullable = false)
	private long id;
	
//	@ElementCollection
	UUID doctorId, patientId;
	
	private LocalDate day;
	private LocalTime startTime;
	int duration;
	
//	@Column(nullable = false)
	Type type;
//	@Column(nullable = false)
	Status status;
	
	String notes;
	
	
	
	
	
	// ------------------------ HELPERS ------------------------ //
	// enums
	private enum Type { // must have previous appointment for there to be a followUp
		checkup, followUp, emergency, consultation
	}
	private enum Status { // if task becomes too much, might them give them the chance to cancel
		scheduled, completed, cancelled
	}
	// ---------------------- END HELPERS ---------------------- //
}


//APPOINTMENTS (NotNull)
//
//long id => auto
//UUID patientId
//UUID doctorId
//LocalDate dateTime
//int duration => mins
//Type type => "checkup" | "followUp" | "emergency" | "consultation"
//Status status => "scheduled" | "completed" | "cancelled"
//String notes => nullable
//String[] symptoms => nullable
//String diagnosis => nullable
//
//Medications prescriptions => nullable