package com.quantumcare.server.services;

import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.MedicalHistory;
import com.quantumcare.server.models.utils.DiagnosisMedicationPair;
import com.quantumcare.server.repositories.AppointmentRepository;
import com.quantumcare.server.repositories.MedicalHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MedicalHistoryGeneratorService {
	
	private final AppointmentRepository appointmentRepository;
	private final MedicalHistoryRepository medicalHistoryRepository;
	
	@Autowired
	public MedicalHistoryGeneratorService(
		AppointmentRepository appointmentRepository, MedicalHistoryRepository medicalHistoryRepository
	) {
		this.appointmentRepository = appointmentRepository;
		this.medicalHistoryRepository = medicalHistoryRepository;
	}
	
	// common medications - both lists must remain the same size :)
	private final List<String> diagnosisTemplate = List.of(
		"Strep throat", "High blood pressure", "High cholesterol", "Insulin resistance", "Depression",
		"Asthma", "Joint pain", "Underactive thyroid", "Acid reflux", "Joint inflammation"
	);
	private final List<MedicalHistory.Medications> medicationTemplates = List.of(
		new MedicalHistory.Medications("Amoxicillin", "500mg", "3 times daily", "7 days"),
    new MedicalHistory.Medications("Lisinopril", "10mg", "Once daily", "30 days"),
    new MedicalHistory.Medications("Atorvastatin", "20mg", "Once daily at bedtime", "30 days"),
    new MedicalHistory.Medications("Metformin", "1000mg", "Twice daily with meals", "30 days"),
    new MedicalHistory.Medications("Sertraline", "50mg", "Once daily in the morning", "30 days"),
    new MedicalHistory.Medications("Albuterol", "90mcg", "2 puffs every 4-6 hours as needed", "30 days"),
    new MedicalHistory.Medications("Ibuprofen", "400mg", "Every 6 hours as needed for pain", "7 days"),
    new MedicalHistory.Medications("Levothyroxine", "75mcg", "Once daily on empty stomach", "30 days"),
    new MedicalHistory.Medications("Omeprazole", "20mg", "Once daily before breakfast", "14 days"),
    new MedicalHistory.Medications("Prednisone", "10mg", "Once daily", "5 days taper")
	);
	
	/**
	 * this scheduled task runs every night at 21:00 to generate medical history
	 * for new appointments that meet the criteria.
	 */
		@Scheduled(cron = "0 0 21 * * *")
		public void generateMedicalHistoriesForAppointments() {
			// find all scheduled appointments that don't have medical history yet
			List<Appointments> appointments = appointmentRepository.findByStatusAndCurrentDate(Appointments.Status.Scheduled);
			
			for (Appointments appointment : appointments) {
				// check if the appointment type qualifies for medication generation
				if (shouldGenerateMedications(appointment)) {
					// generate diagnosis and medication based on the appointment type
					List<DiagnosisMedicationPair> medicationPairs = generateMedicationsBasedOnAppointmentType(appointment);
					
					// join diagnoses
					String diagnoses = medicationPairs.stream()
						.map(DiagnosisMedicationPair::getDiagnosis)
						.collect(Collectors.joining(", "));
					
					// get all medications
					List<MedicalHistory.Medications> medications = new ArrayList<>();
					for (DiagnosisMedicationPair medicationPair : medicationPairs) {
						medications.add(medicationPair.getMedication());
					}
					
					// add to medical history
					MedicalHistory medicalHistory = new MedicalHistory(
						appointment.getPatientId(), diagnoses, appointment.getDate()
					);
					if (!medications.isEmpty()) {
						medicalHistory.setMedications(medications);
					}

					// save to repository
					medicalHistoryRepository.save(medicalHistory);
				}
			}
		}
		
	/**
	 * generates medications based on the appointment type:
	 * - 50% chance of medication if Follow Up
	 * - 100% chance of medication if Emergency
	 */
	private List<DiagnosisMedicationPair> generateMedicationsBasedOnAppointmentType(Appointments appointment) {
		Random random = new Random();
		Set<DiagnosisMedicationPair> medicationPairs = new HashSet<>();
		
		if (appointment.getType() == Appointments.Type.emergency) {
			// for emergency, always add medications (100%)
			int medicationCount = random.nextInt(2) + 2; // 2-3 medications for emergency
			for (int i = 0; i < medicationCount; i++) {
				DiagnosisMedicationPair template = getRandomMedicationPairTemplate();
				medicationPairs.add(template);
			}
		} else if (appointment.getType() == Appointments.Type.followUp) {
			// for follow-up, 50% chance to add medications
			if (random.nextBoolean()) {
				int medicationCount = random.nextInt(2) + 1; // 1-2 medications for emergency
				for (int i = 0; i < medicationCount; i++) {
					DiagnosisMedicationPair template = getRandomMedicationPairTemplate();
					medicationPairs.add(template);
				}
			}
		}
		
		return medicationPairs.stream().toList();
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * helper method to get a random medication template
	 */
	private DiagnosisMedicationPair getRandomMedicationPairTemplate() {
		Random random = new Random();
		int index = random.nextInt(diagnosisTemplate.size());
		
		return new DiagnosisMedicationPair(
			diagnosisTemplate.get(index), medicationTemplates.get(index)
		);
	}
	
	/**
	 * determines if we should generate medications for the appointment type
	 */
	private boolean shouldGenerateMedications(Appointments appointment) {
		return appointment.getType() == Appointments.Type.followUp ||
			appointment.getType() == Appointments.Type.emergency;
	}
	// ---------------------- END HELPERS ---------------------- //
}
