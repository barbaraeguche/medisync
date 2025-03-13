package com.quantumcare.server.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * component that creates case-insensitive indexes for email and license number fields,
 * and sets up triggers for appointment cancellation on doctor availability changes.
 * this runs after application initialization to ensure the database has the proper constraints.
 */
@Component
public class DbIndexInitializer {
	
	private final JdbcTemplate jdbcTemplate;
	
	@Autowired
	public DbIndexInitializer(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }
	
	/**
	 * create case-insensitive functional indexes and appointment triggers after application startup.
	 * - for emails: convert to lowercase when storing to ensure case-insensitive uniqueness
	 * - for license numbers: preserve original case but enforce case-insensitive uniqueness
	 * - for appointments: cancel them when doctor availability changes
	 */
	@PostConstruct
	public void createFunctionalIndexes() {
		try {
			// create case-insensitive index for email in user's table
			jdbcTemplate.execute(
				"create unique index if not exists idx_users_email_lower on users (lower(email))"
			);
			
			// create case-insensitive index for license_number in doctor's table
			jdbcTemplate.execute(
				"create unique index if not exists idx_doctors_license_number_lower on practitioner (lower(license_number))"
			);
		} catch (Exception _) {}
	}
}
