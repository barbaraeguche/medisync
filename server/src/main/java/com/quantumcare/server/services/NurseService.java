package com.quantumcare.server.services;

import com.quantumcare.server.models.Nurse;
import com.quantumcare.server.models.User;
import com.quantumcare.server.models.factories.HelperFactory;
import com.quantumcare.server.models.factories.NurseFactory;
import com.quantumcare.server.models.factories.UserFactory;
import com.quantumcare.server.models.helpers.Practitioner;
import com.quantumcare.server.repositories.NurseRepository;
import com.quantumcare.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class NurseService {
	
	private final NurseRepository nurseRepository;
	private final NurseFactory nurseFactory;
	private final UserFactory userFactory;
	private final UserRepository userRepository;
	private final HelperFactory helperFactory;
	
	@Autowired
	public NurseService(NurseRepository nurseRepository, NurseFactory nurseFactory, UserFactory userFactory, UserRepository userRepository, HelperFactory helperFactory) {
    this.nurseRepository = nurseRepository;
		this.nurseFactory = nurseFactory;
		this.userFactory = userFactory;
		this.userRepository = userRepository;
		this.helperFactory = helperFactory;
	}
	
	public Nurse getNurseById(UUID id) {
    return nurseRepository.findById(id).orElse(null);
  }
	
	public void postNurse(Nurse reqNurse) {
		User user = userFactory.createUser(reqNurse.getUser());
		Practitioner practitioner = helperFactory.createPractitioner(reqNurse.getPractitioner());
		Nurse nurse = nurseFactory.createNurse(user, practitioner, reqNurse);
		
		// save the nurse
    nurseRepository.save(nurse);
  }
	
	public void putNurse(Nurse prevNurse, Nurse currNurse) {
    userFactory.updateUser(prevNurse.getUser(), currNurse.getUser());
		helperFactory.updatePractitioner(prevNurse.getPractitioner(), currNurse.getPractitioner());
    nurseFactory.updateNurse(prevNurse, currNurse);
    nurseRepository.save(prevNurse);
  }
	
	public void deleteNurse(Nurse reqNurse) {
    nurseRepository.delete(reqNurse);
    userRepository.delete(reqNurse.getUser());
  }
}
