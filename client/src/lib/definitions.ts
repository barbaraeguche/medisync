export type InputConfig = {
	label?: string;
	labelStyle?: string;
	placeholder?: string;
}

export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	gender: 'Male' | 'Female';
	role: 'Admin' | 'Doctor' | 'Patient';
	address?: {
		street?: string;
		city?: string;
		province: string;
		postalCode: string;
		country: string;
	};
	emergencyContact?: {
		name: string;
		relationship?: string;
		email: string;
	};
}

export interface Doctor {
	_id: string;
	user: User;
	practitioner: Practitioner;
	doctorAvailabilities?: {
		date: Date;
		startTime: string;
		endTime: string;
	}[];
	appointments?: Appointments[];
}

export interface Patient {
	_id: string;
	user: User;
	dateOfBirth: Date;
	allergies?: string;
	bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | '';
	insuranceProvider?: string;
	insurancePolicyNumber?: string;
	appointments?: Appointments[];
	medicalHistory?: MedicalHistory[];
	chronicConditions?: string;
	healthMetrics?: {
		height?: number;
		weight?: number;
		heartRate?: number;
	};
}

export interface Practitioner {
	_id: number;
	licenseNumber: string;
	specialization: string;
	yearsOfExperience: number;
	languages: string;
	education?: {
		degree: string;
		institution: string;
		graduationYear: string;
	}[];
}

export interface MedicalHistory {
	_id: number;
	diagnosis: string;
	diagnosisDate: Date;
	medications?: {
		drugName: string;
		dosage: string;
		frequency: string;
		duration: string;
	}[];
	patientId: string;
}

export interface Appointments {
	_id: number;
	date: Date;
	startTime: string;
	endTime: string;
	type: 'Checkup' | 'Follow Up' | 'Emergency' | 'Consultation';
	status: 'Scheduled' | 'Completed' | 'Cancelled';
	notes?: string;
	doctorId?: string;
	patientId?: string;
}


export const appointments: Appointments[] = [
	{
		_id: 1,
		date: new Date('2025-02-17'),
		startTime: '09:00',
		endTime: '09:30',
		type: 'Checkup',
		status: 'Scheduled',
		notes: 'Routine checkup for blood pressure monitoring.',
		doctorId: 'DOC1001',
		patientId: 'PAT2001',
	},
	{
		_id: 2,
		date: new Date('2025-02-17'),
		startTime: '10:00',
		endTime: '10:45',
		type: 'Follow Up',
		status: 'Scheduled',
		notes: 'Post-surgery follow-up for knee replacement.',
		doctorId: 'DOC1002',
		patientId: 'PAT2002',
	},
	{
		_id: 11,
		date: new Date('2025-02-17'),
		startTime: '09:00',
		endTime: '09:30',
		type: 'Checkup',
		status: 'Scheduled',
		notes: 'Routine checkup for blood pressure monitoring.',
		doctorId: 'DOC1001',
		patientId: 'PAT2001',
	},
	{
		_id: 12,
		date: new Date('2025-02-17'),
		startTime: '10:00',
		endTime: '10:45',
		type: 'Follow Up',
		status: 'Scheduled',
		notes: 'Post-surgery follow-up for knee replacement.',
		doctorId: 'DOC1002',
		patientId: 'PAT2002',
	},
	{
		_id: 3,
		date: new Date('2025-02-17'),
		startTime: '11:30',
		endTime: '12:00',
		type: 'Emergency',
		status: 'Completed',
		notes: 'Acute chest pain; patient stabilized and referred to cardiology.',
		doctorId: 'DOC1003',
		patientId: 'PAT2003',
	},
	{
		_id: 4,
		date: new Date('2025-02-18'),
		startTime: '14:00',
		endTime: '14:30',
		type: 'Consultation',
		status: 'Scheduled',
		notes: 'Initial consultation for allergy symptoms.',
		doctorId: 'DOC1004',
		patientId: 'PAT2004',
	},
	{
		_id: 5,
		date: new Date('2025-02-18'),
		startTime: '15:00',
		endTime: '15:30',
		type: 'Checkup',
		status: 'Cancelled',
		notes: 'Annual physical checkup; patient rescheduled.',
		doctorId: 'DOC1005',
		patientId: 'PAT2005',
	},
	{
		_id: 6,
		date: new Date('2025-02-19'),
		startTime: '08:30',
		endTime: '09:15',
		type: 'Follow Up',
		status: 'Scheduled',
		notes: 'Review test results for diabetes management.',
		doctorId: 'DOC1006',
		patientId: 'PAT2006',
	},
	{
		_id: 7,
		date: new Date('2025-02-19'),
		startTime: '11:00',
		endTime: '11:45',
		type: 'Consultation',
		status: 'Completed',
		notes: 'Discussion about mental health concerns and therapy options.',
		doctorId: 'DOC1007',
		patientId: 'PAT2007',
	},
	{
		_id: 8,
		date: new Date('2025-02-20'),
		startTime: '13:00',
		endTime: '13:30',
		type: 'Checkup',
		status: 'Scheduled',
		notes: 'Pediatric checkup for growth assessment.',
		doctorId: 'DOC1008',
		patientId: 'PAT2008',
	},
	{
		_id: 9,
		date: new Date('2025-02-21'),
		startTime: '16:00',
		endTime: '16:45',
		type: 'Emergency',
		status: 'Completed',
		notes: 'Patient had a severe allergic reaction; given antihistamines.',
		doctorId: 'DOC1009',
		patientId: 'PAT2009',
	},
	{
		_id: 10,
		date: new Date('2025-02-22'),
		startTime: '10:30',
		endTime: '11:00',
		type: 'Follow Up',
		status: 'Scheduled',
		notes: 'Monitoring recovery progress from a recent surgery.',
		doctorId: 'DOC1010',
		patientId: 'PAT2010',
	},
];
