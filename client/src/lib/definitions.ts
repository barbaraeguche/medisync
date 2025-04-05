import { provinces } from '@/utils/constants';

export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber?: string | null;
	gender: 'Male' | 'Female' | 'N/A';
	role: 'Admin' | 'Doctor' | 'Patient' | 'N/A';
	address?: {
		street?: string;
		city?: string;
		province: (typeof provinces)[number];
		postalCode?: string;
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
	availabilities?: Availabilities;
	appointments?: Appointments[];
}

export type Availabilities = {
	date: string;
	startTime: string;
	endTime: string;
}[];

export interface Patient {
	_id: string;
	user: User;
	dateOfBirth: string;
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
	diagnosisDate: string;
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
	doctorName?: string;
	patientId: string;
	patientName?: string;
	date: string;
	time: string;
	type: 'Checkup' | 'Follow Up' | 'Emergency' | 'Consultation';
	status: 'Scheduled' | 'Completed' | 'Cancelled';
	noteToDoctor?: string;  // patient can add notes for the doctor to see
	statusNote?: string;    // system-generated notes about status changes
}