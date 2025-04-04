import { CalendarClock, CircleCheck, CircleX } from 'lucide-react';
import clsx from 'clsx';

export default function AppointmentStatus({ status }: {
	status: 'Scheduled' | 'Completed' | 'Cancelled'
}) {
	const iconStyle = 'mr-1 size-4 font-medium';
	const icons = {
		Scheduled: CalendarClock,
		Completed: CircleCheck,
		Cancelled: CircleX
	}
	
	// get the correct icon component
	const Icon = icons[status];
	
	return (
		<span
			className={clsx(
				'border inline-flex items-center rounded-full px-2 py-1 text-xs',
				{
					'bg-amber-50 text-amber-600 border-amber-100': status === 'Scheduled',
					'bg-green-50 text-green-600 border-green-100': status === 'Completed',
					'bg-red-50 text-red-600 border-red-100': status === 'Cancelled'
				}
			)}
		>
			<Icon className={iconStyle}/> {status}
    </span>
	);
}