import { z } from 'zod';
import {
	emailRegex, phoneNumberRegex, postalCodeRegex
} from '@/utils/regex';
import {
	validGenders,validRoles, validCanadianProvinces
} from '@/utils/constants.ts';

const UserSchema = z.object({
	firstName: z.string().min(1, { message: 'Enter your first name' }),
	lastName: z.string().min(1, { message: 'Enter your last name' }),
	email: z.string().refine((val) => emailRegex.test(val), {
		message: 'Enter a valid email address'
	}),
	phoneNumber: z.string().refine((val) => phoneNumberRegex.test(val), {
		message: 'Enter a valid 10-digit Canadian phone number'
	}),
	gender: z.enum(validGenders, { message: 'Select a gender' }),
	role: z.enum(validRoles, { message: 'Select a role' })
});
export const BasicUserSchema = UserSchema.pick({ firstName: true, lastName: true });
export type BasicUserType = z.infer<typeof BasicUserSchema>;

export const AddressSchema = z.object({
	street: z.string().min(1, { message: 'Enter a valid street' })
		.optional().or(z.literal('')),
	city: z.string().min(1, { message: 'Enter a valid street' })
		.optional().or(z.literal('')),
	province: z.enum(validCanadianProvinces, { message: 'Select a province' }),
	postalCode: z.string().refine((val) => postalCodeRegex.test(val), {
		message: 'Enter a valid Canadian postal code'
	}),
	country: z.string().refine((val) => val === 'Canada', {
		message: 'Country must be Canada'
	})
});
export type AddressType = z.infer<typeof AddressSchema>;

export const EmergencyContactSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	relationship: z.string().min(2, { message: 'Enter the relationship type' })
		.optional().or(z.literal('')),
	email: z.string()
		.refine((val) => emailRegex.test(val), {
			message: 'Enter a valid email address'
		})
});
export type EmergencyContactType = z.infer<typeof EmergencyContactSchema>;