package com.quantumcare.server.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * component that creates case-insensitive indexes for email and license number fields,
 * this runs after application initialization to ensure the database has the proper constraints.
 */
@Component
public class DbSchemaInitializer {
	
	private final JdbcTemplate jdbcTemplate;
	
	@Autowired
	public DbSchemaInitializer(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }
	
	@PostConstruct
	public void createFunctionalIndexes() {
		try {
			/* ----------------------------- INDICES -----------------------------    */
			// create case-insensitive index for email in user's table
			jdbcTemplate.execute(
				"create unique index if not exists idx_users_email_lower on users (lower(email))"
			);
			// create case-insensitive index for license_number in doctor's table
			jdbcTemplate.execute(
				"create unique index if not exists idx_doctors_license_number_lower on practitioner (lower(license_number))"
			);
			
			
			/* ----------------------------- TRIGGERS -----------------------------    */
			// create function to handle cancellation of appointments when doctor availability changes
			jdbcTemplate.execute(
				"create or replace function cancel_conflicting_appointments() " +
					"returns trigger as $$ " +
					"begin " +
					"  /* update status to 'Cancelled' for any appointments that are now outside doctor's availability */ " +
					"  update appointments " +
					"  set " +
					"    status = 'Cancelled', " +
					"    status_note = coalesce(status_note, '') || 'Cancelled as doctor changed availability' " +
					"  where " +
					"    doctor_id = new.doctor_id " +
					"    and status = 'Scheduled' " +
					"    and (date, time) not in ( " +
					"      /* subquery to find all valid appointment slots based on availability */ " +
					"      select " +
					"        a.date, " +
					"        (a.start_time + (s.i || ' hour')::interval)::time as time_slot " +
					"      from " +
					"        availabilities a, " +
					"        generate_series(0, extract(hour from a.end_time)::int - extract(hour from a.start_time)::int - 1) as s(i) " +
					"      where " +
					"        a.doctor_id = new.doctor_id " +
					"    ); " +
					"  return new; " +
					"end; " +
					"$$ language plpgsql;"
			);
			// create trigger for INSERT operations on availabilities
			jdbcTemplate.execute(
				"drop trigger if exists trigger_cancel_appointments_on_availability_insert on availabilities; " +
					"create trigger trigger_cancel_appointments_on_availability_insert " +
					"after insert on availabilities " +
					"for each row " +
					"execute function cancel_conflicting_appointments();"
			);
		} catch (Exception _) {}
	}
}
