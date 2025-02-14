import { z } from 'zod';
import {
	emailRegex, phoneNumberRegex, validCanadianProvinces, postalCodeRegex
} from '@/utils/constants.ts';

export const UserSchema = z.object({
	firstName: z.string().min(1, { message: 'Enter your first name' }),
	lastName: z.string().min(1, { message: 'Enter your last name' }),
	email: z.custom<string>((val) => {
		return typeof val === 'string' && emailRegex.test(val);
	}, { message: 'Enter a valid email address' }),
	phoneNumber: z.custom<string>((val) => {
		return typeof val === 'string' && phoneNumberRegex.test(val);
	}, { message: 'Enter a valid 10-digit Canadian phone number' }),
	gender: z.enum(['Male', 'Female'], { message: 'Select a gender' }),
	role: z.enum(['Admin', 'Doctor', 'Patient'], { message: 'Select a role' })
});
export const BasicUserSchema = UserSchema.pick({ firstName: true, lastName: true });
export type BasicUserType = z.infer<typeof BasicUserSchema>;

export const AddressSchema = z.object({
	street: z.string().min(1, { message: 'Enter a valid street' })
		.optional().or(z.literal('')),
	city: z.string().min(1, { message: 'Enter a valid street' })
		.optional().or(z.literal('')),
	province: z.enum(validCanadianProvinces, { message: 'Select a province' }),
	postalCode: z.custom<string>((val) => {
		return typeof val === 'string' && postalCodeRegex.test(val)
	},  { message: 'Enter a valid Canadian postal code' }),
	country: z.custom<string>((val) => {
		return typeof val === 'string' && val === 'Canada'
	}, { message: 'Country must be Canada' })
});
export type AddressType = z.infer<typeof AddressSchema>;

export const EmergencyContactSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' })
		.optional().or(z.literal('')),
	relationship: z.string().min(2, { message: 'Enter the relationship type' })
		.optional().or(z.literal('')),
	email: z.custom<string>((val) => {
		return typeof val === 'string' && emailRegex.test(val);
	}, { message: 'Enter a valid email address' })
		.optional().or(z.literal(''))
});
export type EmergencyContactType = z.infer<typeof EmergencyContactSchema>;