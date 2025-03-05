import { z } from 'zod';
import { numFieldConstraints } from '@/utils/constants.ts';

export const doctorSchema = z.object({ // todo: optionality still does not work
	licenseNumber: z.string().min(1, { message: 'Enter your license number' }),
	specialization: z.string().min(1, { message: 'Enter your specialization' }),
	yearsOfExperience: z.union([
		z.coerce.number().optional(),
		z.coerce.number()
			.min(1, { message: `${numFieldConstraints[0]} 1` })
	]),
	languages: z.string().min(1, { message: 'Enter your spoken languages' })
});
export type DoctorType = z.infer<typeof doctorSchema>;

export const educationSchema = z.object({
	degree: z.string().min(1, { message: 'Enter your degree name' }),
	institution: z.string().min(1, { message: 'Enter your institution name' }),
	graduationYear: z.string().min(1, { message: 'Enter your graduation year' })
		.optional().or(z.literal(''))
});
export type EducationType = z.infer<typeof educationSchema>;