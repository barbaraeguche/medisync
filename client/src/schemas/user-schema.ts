import { z } from 'zod';
import {
	emailRegex, passwordRegex, phoneNumberRegex, postalCodeRegex
} from '@/utils/regex';
import { genders, roles, provinces } from '@/utils/constants';

export const userSchema = z.object({
	firstName: z.string().min(1, { message: 'Enter your first name' }),
	lastName: z.string().min(1, { message: 'Enter your last name' }),
	email: z.string().refine((val) => emailRegex.test(val), {
		message: 'Enter a valid email address'
	}),
	phoneNumber: z.string().regex(phoneNumberRegex, {
		message: 'Enter a valid 10-digit Canadian phone number'
	}).or(z.literal('')),
	password: z.string()
		.min(8, { message: 'Enter a password with at least 8 characters' })
		.refine((val) => passwordRegex.test(val), {
			message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		}),
	gender: z.enum(genders, { message: 'Select a gender' }),
	role: z.enum(roles, { message: 'Select a role' })
});

export const addressSchema = z.object({
	street: z.string().min(2, { message: 'Enter a valid street' })
		.or(z.literal('')),
	city: z.string().min(2, { message: 'Enter a valid street' })
		.or(z.literal('')),
	province: z.enum(provinces, { message: 'Select a province' }),
	postalCode: z.string().regex(postalCodeRegex, {
		message: 'Enter a valid Canadian postal code'
	}).or(z.literal('')),
	country: z.string().refine((val) => val === 'Canada', {
		message: 'Country must be Canada'
	})
});
export type AddressType = z.infer<typeof addressSchema>;

export const emergencyContactSchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	relationship: z.string().min(2, { message: 'Enter the relationship type' })
		.or(z.literal('')),
	email: z.string().refine((val) => emailRegex.test(val), {
		message: 'Enter a valid email address'
	})
});
export type EmergencyContactType = z.infer<typeof emergencyContactSchema>;

// as you can only change your name from the main account page
export const userFullNameSchema = userSchema.pick({ firstName: true, lastName: true });
export type UserFullNameType = z.infer<typeof userFullNameSchema>;

// for account security
export const updateEmailSchema = userSchema.pick({ email: true });
export type UpdateEmailType = z.infer<typeof updateEmailSchema>;

export const updatePhoneNumberSchema = userSchema.pick({ phoneNumber: true });
export type UpdatePhoneNumberType = z.infer<typeof updatePhoneNumberSchema>;

export const updatePasswordSchema = z
	.object({
		...(userSchema.pick({ password: true })).shape,
		confirmPassword: z.string()
	})
	.refine((val) => val.password === val.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;