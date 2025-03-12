import { z } from 'zod';
import { userSchema } from '@/schemas/userSchema';
import { doctorSchema } from '@/schemas/doctorSchema';
import { patientSchema } from '@/schemas/patientSchema';

// for authentication
export const loginSchema = z.object({
	...(userSchema.pick({ email: true })).shape,
	password: z.string().min(3, { message: 'Enter a password with at least 3 characters' })
});
export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z.discriminatedUnion('role', [
	// admin schema
	z.object({
		role: z.literal('Admin'),
		user: userSchema.omit({ role: true, phoneNumber: true })
	}),
	
	// doctor schema
	z.object({
		role: z.literal('Doctor'),
		user: userSchema.omit({ role: true, phoneNumber: true }),
		...doctorSchema.shape
	}),
	
	// patient schema
	z.object({
		role: z.literal('Patient'),
		user: userSchema.omit({ role: true, phoneNumber: true }),
		...patientSchema.shape
	})
]);
export type RegisterType = z.infer<typeof registerSchema>;