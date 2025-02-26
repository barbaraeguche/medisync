import {
	User, Doctor, Patient, Practitioner, MedicalHistory, Appointments
} from '@/lib/definitions';

export const userInitState: User = {
	_id: '',
	firstName: '',
	lastName: '',
	email: 'b',
	password: '',
	phoneNumber: '',
	gender: '',
	role: 'Patient',
	address: {
		street: '',
		city: '',
		province: '',
		postalCode: '',
		country: ''
	},
	emergencyContact: {
		name: '',
		relationship: '',
		email: ''
	}
};

export const practitionerInitState: Practitioner = {
	_id: 0,
	licenseNumber: '',
	specialization: '',
	yearsOfExperience: 0,
	languages: '',
	education: []
};

export const doctorInitState: Doctor = {
	_id: '',
  user: userInitState,
  practitioner: practitionerInitState,
  availabilities: [],
  appointments: []
};

export const patientInitState: Patient = {
	_id: '',
	user: userInitState,
	dateOfBirth: new Date('1900-01-01'),
  allergies: '',
  bloodType: '',
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

export const medicalHistInitState: MedicalHistory = {
	_id: 0,
  diagnosis: '',
  diagnosisDate: new Date('1900-01-01'),
  medications: [],
	patientId: ''
};

export const appointmentInitState: Appointments = {
	_id: 0,
  date: new Date('1900-01-01'),
  time: '',
  type: '',
  status: '',
  notes: '',
  doctorId: '',
  patientId: ''
};