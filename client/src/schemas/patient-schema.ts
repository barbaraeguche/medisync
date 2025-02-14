import { z } from 'zod';

const formatTxt = ['Greater than', 'Less than'];

export const PatientSchema = z.object({
	dateOfBirth: z.custom<Date>((val) => {
		return typeof val === 'string' && new Date(val).toISOString().split('T')[0];
	})
	
	
	// dateOfBirth: Date;
	// allergies: string;
	// bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | '';
	// insuranceProvider?: string;
	// insurancePolicyNumber?: string;
});
export type PatientType = z.infer<typeof PatientSchema>;

export const HealthMetricsSchema = z.object({
	height: z.number()
		.min(30, { message: `${formatTxt[0]} 30 cm` })
		.max(272, { message: `${formatTxt[1]} 272 cm` }),
	weight: z.number()
		.min(5, { message: `${formatTxt[0]} 5 lbs` })
		.max(355, { message: `${formatTxt[1]} 355 lbs` }),
	bloodSugar: z.number()
		.min(54, { message: '' })
		.max(272, { message: '' }),
	bloodPressure: z.string()
});
export type HealthMetricsType = z.infer<typeof HealthMetricsSchema>;