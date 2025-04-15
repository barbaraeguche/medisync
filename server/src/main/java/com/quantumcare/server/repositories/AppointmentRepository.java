package com.quantumcare.server.repositories;

import com.quantumcare.server.models.helpers.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointments, Long> {
	List<Appointments> findByPatientId(UUID patientId);
	
	@Query("select apt from Appointments apt where apt.status = :status and apt.date = current_date")
	List<Appointments> findByStatusAndCurrentDate(@Param("status") Appointments.Status status);
}
