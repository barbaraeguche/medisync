import { z } from 'zod';
import { appointmentStatus, appointmentTypes } from '@/utils/constants';

export const appointmentSchema = z.object({
	doctorId: z.string().uuid({ message: 'Invalid doctor ID' }),
	date: z.string().date('Date cannot be null'),
	time: z.string({ message: 'Select a valid time (e.g., 10:00)' }),
	type: z.enum(appointmentTypes, { message: 'Select an appointment type' }),
	status: z.enum(appointmentStatus, { message: 'Select the updated status' })
		.default('Scheduled'),
	noteToDoctor: z.string().min(5, { message: 'Enter at least 5 characters' })
		.optional().or(z.literal(''))
});
export type AppointmentType = z.infer<typeof appointmentSchema>;