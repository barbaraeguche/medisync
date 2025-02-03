export interface User {
	_id: string
	firstName: string
	lastName: string
	email: string
	password: string
	dateOfBirth: Date
	gender: 'male' | 'female' | 'undisclosed'
	role: 'admin' | 'doctor' | 'nurse' | 'patient'
	address: {
		street: string
		city: string
		province: string
		postalCode: string
		country: string
	}
	emergencyContact: {
		name: string
		relationship: string
		email: string
	}
}

export interface Doctor {
	_id: string
	user: User
	practitioner: Practitioner
	doctorAvailabilities?: {
		day: Date
		startTime: Date
		endTime: Date
	}[]
	appointments?: Appointments[]
}

export interface Patient {
	_id: string
	user: User
	allergies: string
	bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
	insuranceProvider?: string
	insurancePolicyNumber?: string
	appointments?: Appointments[]
	medicalHistory?: MedicalHistory[]
	healthMetrics: {
		height: number
		weight: number
		bloodSugar: number
		bloodPressure: string
	}
}

export interface Practitioner {
	_id: number
	licenseNumber: string
	specialization: string
	yearsOfExperience: number
	languages: string
	education?: {
		degree: string
		institution: string
		graduationYear: string
	}[]
}

export interface MedicalHistory {
	_id: number
	diagnosis: string
	diagnosisDate: Date
	medications?: {
		drugName: string
		dosage: string
		frequency: string
		duration: string
	}[]
	patientId: string
}

export interface Appointments {
	_id: number
	day: Date
	startTime: Date
	endTime: Date
	type: 'checkup' | 'followUp' | 'emergency' | 'consultation'
	status: 'scheduled' | 'completed' | 'cancelled'
	notes: string
	doctorId: string
	patientId: string
}
