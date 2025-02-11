import { z } from 'zod';

export const BasicUserInfoSchema = z.object({
	firstName: z.string().min(1, { message: 'Enter your first name' }),
	lastName: z.string().min(1, { message: 'Enter your last name' }),
	email: z.custom<string>((val) => {
		return typeof val === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(val);
	}, { message: 'Enter a valid email address' }),
	phoneNumber: z.custom<string>((val) => {
		return typeof val === 'string' && /^(\(\d{3}\) |\d{3}-?)\d{3}-?\d{4}$/.test(val);
	}, { message: 'Enter a valid 10-digit Canadian phone number' }),
	gender: z.enum(['male', 'female'], { message: 'Select a gender' })
});
export type BasicUserInfoType = z.infer<typeof BasicUserInfoSchema>;

export const UserAddressSchema = z.object({
	street: z.string().min(1, { message: 'Enter a valid street' }),
	city: z.string().min(1, { message: 'Enter a valid city' }),
	province: z.enum([
		''
	], { message: 'Select a province' }),
	postalCode: z.custom<string>((val) => {
		return typeof val === 'string' && /^$/.test(val)
	},  { message: '' }),
	country: z.custom<string>((val) => {
		return typeof val === 'string' && val !== 'Canada'
	}).optional()
});
export type UserAddressType = z.infer<typeof UserAddressSchema>;

export const UserEmergencyContactSchema = z.object({

});
export type UserEmergencyContactType = z.infer<typeof UserEmergencyContactSchema>;