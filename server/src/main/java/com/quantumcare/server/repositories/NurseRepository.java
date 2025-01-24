package com.quantumcare.server.repositories;

import com.quantumcare.server.models.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NurseRepository extends JpaRepository<Nurse, Integer> { }
