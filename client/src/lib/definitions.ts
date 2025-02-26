export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	gender: 'Male' | 'Female' | '';
	role: 'Admin' | 'Doctor' | 'Patient' | '';
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
	availabilities?: {
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
	time: string;
	type: 'Checkup' | 'Follow Up' | 'Emergency' | 'Consultation' | '';
	status: 'Scheduled' | 'Completed' | 'Cancelled' | '';
	notes?: string;
	doctorId: string;
	patientId: string;
}