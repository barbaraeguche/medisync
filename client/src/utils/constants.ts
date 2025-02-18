export const numFieldConstraints = ['Greater than', 'Less than'];

export const validCanadianProvinces = [
	'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
] as const;
export const validGenders = [
	'Male', 'Female'
] as const;
export const validRoles = [
	'Admin', 'Doctor', 'Patient'
] as const;
export const validBloodTypes = [
	'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
] as const;
export const validAppointmentTypes = [
	'Consultation', 'Checkup', 'Follow Up', 'Emergency'
] as const;

export const canadianProvinces = validCanadianProvinces.map((province) => ({
	value: province,
	label: province
}));
export const genders = validGenders.map((gender) => ({
	value: gender,
	label: gender
}));
export const roles = validRoles.map((role) => ({
	value: role,
	label: role
}));
export const bloodTypes = validBloodTypes.map((bloodType) => ({
	value: bloodType,
	label: bloodType
}));
export const appointmentType = validAppointmentTypes.map((appType) => ({
	value: appType,
	label: appType
}));