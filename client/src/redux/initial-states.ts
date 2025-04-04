import { User, Doctor, Patient } from '@/lib/definitions';

export const userInitState: User = {
	_id: '',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	phoneNumber: '',
	gender: 'N/A',
	role: 'N/A',
	address: {
		street: '',
		city: '',
		province: 'Quebec',
		postalCode: '',
		country: 'Canada',
	},
	emergencyContact: {
		name: '',
		relationship: '',
		email: ''
	}
};

export const doctorInitState: Doctor = {
	_id: '',
  user: { ...userInitState },
  practitioner: {
		_id: 0,
		licenseNumber: '',
		specialization: '',
		yearsOfExperience: 0,
		languages: '',
		education: {
			degree: '',
			institution: '',
			graduationYear: ''
		}
	},
  availabilities: [],
  appointments: []
};

export const patientInitState: Patient = {
	_id: '',
	user: { ...userInitState },
	dateOfBirth: '1900-01-01',
  allergies: '',
  bloodType: 'N/A',
  insuranceProvider: '',
  insurancePolicyNumber: '',
	appointments: [],
	medicalHistory: [],
	chronicConditions: '',
  healthMetrics: {
		height: 0,
    weight: 0,
	  heartRate: 0
  }
};