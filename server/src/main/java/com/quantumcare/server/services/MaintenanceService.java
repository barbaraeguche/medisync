package com.quantumcare.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceService {
	
	private final JdbcTemplate jdbcTemplate;
	
	@Autowired
	public MaintenanceService(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	/**
	 * updates status of past scheduled appointments to 'Completed'.
	 * runs daily at 23:59.
	 */
	@Scheduled(cron = "0 59 23 * * *")
	public void markAppointmentsAsCompleted() {
		jdbcTemplate.execute(
			"update appointments appt " +
			"set status = 'Completed' " +
			"where status = 'Scheduled' " +
			"  and appt.date < current_date;"
		);
	}
	
	/**
	 * deletes availabilities older than 3 days.
	 * runs weekly on sunday at 23:59.
	 */
	@Scheduled(cron = "0 59 23 ? * SUN")
	public void deleteOldAvailabilities() {
		jdbcTemplate.execute(
			"delete from availabilities avail " +
				"where avail.date < current_date - interval '3 days';"
		);
	}
	
	/**
	 * deletes appointments older than 30 days.
	 * runs weekly on sunday at 23:59.
	 */
	@Scheduled(cron = "0 59 23 ? * SUN")
	public void deleteOldAppointments() {
		jdbcTemplate.execute(
			"delete from appointments appt " +
				"where appt.date < current_date - interval '30 days';"
		);
	}
	
	/**
	 * deletes medical histories older than 2 weeks.
	 * runs weekly on sunday at 23:59.
	 */
	@Scheduled(cron = "0 59 23 ? * SUN")
	public void deleteOldMedicalHistory() {
		jdbcTemplate.execute(
			"delete from medical_history " +
				"where diagnosis_date < current_date - interval '2 weeks';"
		);
	}
}
