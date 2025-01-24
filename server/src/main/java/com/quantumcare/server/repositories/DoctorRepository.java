package com.quantumcare.server.repositories;

import com.quantumcare.server.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> { }
