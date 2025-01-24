package com.quantumcare.server.repositories;

import com.quantumcare.server.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> { }
