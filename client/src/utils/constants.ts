export const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneNumberRegex: RegExp = /^(\(\d{3}\) |\d{3}-?)\d{3}-?\d{4}$/;
export const postalCodeRegex: RegExp = /^[a-z][0-9][a-z]\s?[0-9][a-z][0-9]$/i;

export const validCanadianProvinces = [
	'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
] as const;

export const canadianProvinces = validCanadianProvinces.map((province) => ({
	value: province,
	label: province
}));

export const genders = (['Male', 'Female'] as const)
	.map((gender) => ({
		value: gender,
		label: gender
	}));

export const roles = (['Admin', 'Doctor', 'Patient'] as const)
	.map((role) => ({
		value: role,
		label: role
	}));

export const bloodTypes = (['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const)
	.map((bloodType) => ({
		value: bloodType,
		label: bloodType
	}));

export const appointmentType = (['Checkup', 'Follow Up', 'Emergency', 'Consultation'] as const)
	.map((appType) => ({
		value: appType,
		label: appType
	}));