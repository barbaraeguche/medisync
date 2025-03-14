package com.quantumcare.server.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * component that creates case-insensitive indexes for email and license number fields,
 * sets up triggers for appointment cancellation on doctor availability changes, and
 * deletes doctor availabilities less than 2 weeks old.
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
					"    status_note = coalesce(status_note, '') || E'\\nDoctor changed availability on ' || now() " +
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
			
			// create function to mark past appointments as completed
			jdbcTemplate.execute(
				"create or replace function mark_completed_appointments() " +
					"returns trigger as $$ " +
					"begin " +
					"  /* update status to 'Completed' for any scheduled appointments that have passed */ " +
					"  update appointments " +
					"  set " +
					"    status = 'Completed', " +
					"    status_note = coalesce(status_note, '') || E'\\nAppointment completed' " +
					"  where " +
					"    status = 'Scheduled' " +
					"    and (date < current_date or (date = current_date AND time < current_time)); " +
					"end; " +
					"$$ language plpgsql;"
			);
			
			// create a function to delete old availabilities
			jdbcTemplate.execute(
				"create or replace function delete_old_availabilities() " +
					"returns void as $$ " +
					"begin " +
					"  /* delete availabilities older than 2 weeks */ " +
					"  delete from availabilities " +
					"  where date < current_date - interval '2 weeks'; " +
					"end; " +
					"$$ language plpgsql;"
			);
			
			/* ----------------------------- SCHEDULES -----------------------------    */
			// use pg_cron extension to run every 2 weeks
			jdbcTemplate.execute(
				"create extension if not exists pg_cron;"
			);
			
			// schedule the function to run every 14 hours
			jdbcTemplate.execute(
				"select cron.schedule('delete-old-availabilities', '0 0 */14 * *', 'select delete_old_availabilities()');"
			);
			
			// schedule the function to run daily at midnight
			jdbcTemplate.execute(
				"select cron.schedule('mark-completed-appointments', '0 0 * * *', 'select mark_completed_appointments()');"
			);
		} catch (Exception _) {}
	}
}
