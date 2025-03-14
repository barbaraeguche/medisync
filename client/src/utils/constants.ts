import { generateLabelValue } from '@/utils/utils';

export const yyyy_MM_dd = 'yyyy-MM-dd';
export const EEEE_MMM_dd_yyyy = 'EEEE, MMM dd. yyyy';
export const MMM_point_dd_yyyy = 'MMM. dd yyyy';
export const MMM_comma_dd_yyyy = 'MMM, dd yyyy';

export const numFieldConstraints = ['Must be greater than', 'Must be less than'];

export const provinces = [
	'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia',
	'Northwest Territories', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
] as const;
export const genders = [ 'Male', 'Female' ] as const;
export const roles = [ 'Admin', 'Doctor', 'Patient' ] as const;
export const bloodTypes = [ 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-' ] as const;
export const appointmentTypes = [ 'Consultation', 'Checkup', 'Follow Up', 'Emergency' ] as const;
export const appointmentStatus = [ 'Scheduled', 'Completed', 'Cancelled' ] as const;

export const provinceOptions = provinces
	.map((province) => generateLabelValue(province));
export const genderOptions = genders
	.map((gender) => generateLabelValue(gender));
export const roleOptions = roles
	.map((role) => generateLabelValue(role));
export const bloodTypeOptions = bloodTypes
	.map((bloodType) => generateLabelValue(bloodType));
export const appointmentTypeOptions = appointmentTypes
	.map((appType) => generateLabelValue(appType));
export const appointmentStatusOptions = appointmentStatus
	.filter((status) => status !== 'Completed')
	.map((status) => generateLabelValue(status));