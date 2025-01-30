package com.quantumcare.server.repositories;

import com.quantumcare.server.models.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NurseRepository extends JpaRepository<Nurse, UUID> { }
