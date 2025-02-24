import { z } from 'zod';
import { appointmentTypes } from '@/utils/constants';

export const AppointmentSchema = z.object({
	date: z.string({ message: 'Date cannot be null' }),
	time: z.string({ message: 'Select a valid time (e.g., 10:00)' }),
	type: z.enum(appointmentTypes, { message: 'Select an appointment type' }),
	notes: z.string().min(5, { message: 'At least 5 characters' })
		.optional().or(z.literal('')),
	doctorId: z.string().uuid({ message: 'Invalid doctor ID' })
});
export type AppointmentType = z.infer<typeof AppointmentSchema>;