import { z } from 'zod';
import { emailRegex, canadianProvinces } from '../utils/constants.ts';

export const BasicUserInfoSchema = z.object({
	firstName: z.string().min(1, { message: 'Enter your first name' }),
	lastName: z.string().min(1, { message: 'Enter your last name' }),
	email: z.custom<string>((val) => {
		return typeof val === 'string' && emailRegex.test(val);
	}, { message: 'Enter a valid email address' }),
	phoneNumber: z.custom<string>((val) => {
		return typeof val === 'string' && /^(\(\d{3}\) |\d{3}-?)\d{3}-?\d{4}$/.test(val);
	}, { message: 'Enter a valid 10-digit Canadian phone number' }),
	gender: z.enum(['male', 'female'], { message: 'Select a gender' }).optional(),
	role: z.enum(['admin', 'doctor', 'patient'], { message: 'Select a role' }).optional()
});
export type BasicUserInfoType = z.infer<typeof BasicUserInfoSchema>;

export const UserAddressSchema = z.object({
	street: z.string().min(1, { message: 'Enter a valid street' }),
	city: z.string().min(1, { message: 'Enter a valid city' }),
	province: z.enum(canadianProvinces, { message: 'Select a province' }),
	postalCode: z.custom<string>((val) => {
		return typeof val === 'string' && /^[a-z][0-9][a-z]\s?[a-z][0-9][a-z]$/i.test(val)
	},  { message: '' }),
	country: z.custom<string>((val) => {
		return typeof val === 'string' && val === 'Canada'
	}, { message: 'Country must be Canada' })
}).optional();
export type UserAddressType = z.infer<typeof UserAddressSchema>;

export const UserEmergencyContactSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	relationship: z.string().min(1, { message: 'Enter a relationship type' }),
	email: z.custom<string>((val) => {
		return typeof val === 'string' && emailRegex.test(val);
	}, { message: 'Enter a valid email address' }),
});
export type UserEmergencyContactType = z.infer<typeof UserEmergencyContactSchema>;