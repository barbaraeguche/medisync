import { z } from 'zod';
import {
	emailRegex, phoneNumberRegex, canadianProvinces, postalCodeRegex
} from '@/utils/constants.ts';

export const BasicUserInfoSchema = z.object({
	firstName: z.string().min(1, { message: 'Enter your first name' }),
	lastName: z.string().min(1, { message: 'Enter your last name' }),
	email: z.custom<string>((val) => {
		return typeof val === 'string' && emailRegex.test(val);
	}, { message: 'Enter a valid email address' }),
	phoneNumber: z.custom<string>((val) => {
		return typeof val === 'string' && phoneNumberRegex.test(val);
	}, { message: 'Enter a valid 10-digit Canadian phone number' }),
	gender: z.enum(['male', 'female'], { message: 'Select a gender' }),
	// role: z.enum(['admin', 'doctor', 'patient'], { message: 'Select a role' }).optional()
});
export type BasicUserInfoType = z.infer<typeof BasicUserInfoSchema>;

export const UserAddressSchema = z.object({
	street: z.string().min(1, { message: 'Enter a valid street' }),
	city: z.string().min(1, { message: 'Enter a valid city' }),
	province: z.enum(canadianProvinces, { message: 'Select a province' }),
	postalCode: z.custom<string>((val) => {
		return typeof val === 'string' && postalCodeRegex.test(val)
	},  { message: 'Enter a valid canadian postal code' }),
	country: z.custom<string>((val) => {
		return typeof val === 'string' && val === 'Canada'
	}, { message: 'Country must be Canada' })
});
export type UserAddressType = z.infer<typeof UserAddressSchema>;

export const UserEmergencyContactSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	relationship: z.string().min(1, { message: 'Enter the relationship type' }),
	email: z.custom<string>((val) => {
		return typeof val === 'string' && emailRegex.test(val);
	}, { message: 'Enter a valid email address' }),
});
export type UserEmergencyContactType = z.infer<typeof UserEmergencyContactSchema>;