import { z } from 'zod';
import { bloodTypes, numFieldConstraints } from '@/utils/constants.ts';

const PatientSchema = z.object({
	dateOfBirth: z.string().date('Birth date cannot be null'),
	allergies: z.string().optional(),
	bloodType: z.enum(bloodTypes, { message: 'Select a blood type' }),
	insuranceProvider: z.string().optional(),
	insurancePolicyNumber: z.string().optional(),
	chronicConditions: z.string().optional()
});
export const BasicPatientSchema = PatientSchema.omit({ bloodType: true });
export type PatientType = z.infer<typeof BasicPatientSchema>;

export const HealthMetricsSchema = z.object({
	height: z.union([
		z.coerce.number().nullish(),
		z.coerce.number()
			.min(5, { message: `${numFieldConstraints[0]} 5` })
			.max(355, { message: `${numFieldConstraints[1]} 355` })
	]),
	weight: z.union([
		z.coerce.number().nullish(),
		z.coerce.number()
			.min(5, { message: `${numFieldConstraints[0]} 5` })
			.max(355, { message: `${numFieldConstraints[1]} 355` }),
	]),
	heartRate: z.union([
		z.coerce.number().nullish(),
		z.coerce.number()
			.min(54, { message: `${numFieldConstraints[0]} 54` })
			.max(272, { message: `${numFieldConstraints[0]} 272` })
	])
});
export type HealthMetricsType = z.infer<typeof HealthMetricsSchema>;