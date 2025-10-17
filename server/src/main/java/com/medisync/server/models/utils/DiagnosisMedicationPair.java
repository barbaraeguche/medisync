package com.medisync.server.models.utils;

import com.medisync.server.models.helpers.MedicalHistory;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * a class representing a pair of a diagnosis string and its corresponding medication.
 * this replaces the need for Object[] arrays when returning multiple template types together.
 */
@Data
@AllArgsConstructor
public class DiagnosisMedicationPair {
	
	private String diagnosis;
	private MedicalHistory.Medications medication;
}
