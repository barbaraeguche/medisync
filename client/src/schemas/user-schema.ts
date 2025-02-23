import { z } from 'zod';
import {
	emailRegex, passwordRegex, phoneNumberRegex, postalCodeRegex
} from '@/utils/regex';
import {
	genders, roles, provinces
} from '@/utils/constants.ts';

const UserSchema = z.object({
	firstName: z.string().min(1, { message: 'Enter your first name' }),
	lastName: z.string().min(1, { message: 'Enter your last name' }),
	email: z.string().refine((val) => emailRegex.test(val), {
		message: 'Enter a valid email address'
	}),
	password: z.string()
		.min(8, { message: 'Enter a password with at least 8 characters' })
		.refine((val) => passwordRegex.test(val), {
			message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		}),
	phoneNumber: z.string().regex(phoneNumberRegex, {
		message: 'Enter a valid 10-digit Canadian phone number'
	}),
	gender: z.enum(genders, { message: 'Select a gender' }),
	role: z.enum(roles, { message: 'Select a role' })
});
export const BasicUserSchema = UserSchema.pick({ firstName: true, lastName: true });
export type BasicUserType = z.infer<typeof BasicUserSchema>;

export const AddressSchema = z.object({
	street: z.string().min(1, { message: 'Enter a valid street' })
		.optional().or(z.literal('')),
	city: z.string().min(1, { message: 'Enter a valid street' })
		.optional().or(z.literal('')),
	province: z.enum(provinces, { message: 'Select a province' }),
	postalCode: z.string().regex(postalCodeRegex, {
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
	email: z.string().refine((val) => emailRegex.test(val), {
		message: 'Enter a valid email address'
	})
});
export type EmergencyContactType = z.infer<typeof EmergencyContactSchema>;

// for account security
export const UpdateEmailSchema = UserSchema.pick({ email: true });
export type UpdateEmailType = z.infer<typeof UpdateEmailSchema>;

export const UpdatePhoneNumberSchema = UserSchema.pick({ phoneNumber: true });
export type UpdatePhoneNumberType = z.infer<typeof UpdatePhoneNumberSchema>;

export const UpdatePasswordSchema = z
	.object({
		...(UserSchema.pick({ password: true })).shape,
		confirmPassword: z.string()
	})
	.refine((val) => val.password === val.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});
export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;

// for authentication
