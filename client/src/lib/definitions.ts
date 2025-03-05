import { provinces } from '@/utils/constants';

export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	gender: 'Male' | 'Female' | 'N/A';
	role: 'Admin' | 'Doctor' | 'Patient' | 'N/A';
	address?: {
		street?: string;
		city?: string;
		province: (typeof provinces)[number];
		postalCode: string;
		country: 'Canada';
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
	availabilities?: Availabilities[];
	appointments?: Appointments[];
}

export type Availabilities = {
	date: Date;
	startTime: string;
	endTime: string;
};

export interface Patient {
	_id: string;
	user: User;
	dateOfBirth: Date;
	allergies?: string;
	bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'N/A';
	insuranceProvider?: string;
	insurancePolicyNumber?: string;
	chronicConditions?: string;
	healthMetrics?: {
		height?: number;
		weight?: number;
		heartRate?: number;
	};
	medicalHistory?: MedicalHistory[];
	appointments?: Appointments[];
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
		graduationYear?: string;
	};
}

export interface MedicalHistory {
	_id: number;
	patientId: string;
	diagnosis: string;
	diagnosisDate: Date;
	medications?: {
		drugName: string;
		dosage: string;
		frequency: string;
		duration: string;
	}[];
}

export interface Appointments {
	_id: number;
	doctorId: string;
	patientId: string;
	date: Date;
	time: string;
	type: 'Checkup' | 'Follow Up' | 'Emergency' | 'Consultation' | 'N/A';
	status: 'Scheduled' | 'Completed' | 'Cancelled' | 'N/A';
	notes?: string;
}