import { toast } from 'react-hot-toast';
import { ThunkStatus } from '@/lib/types';

export const showToast = (
	message: string | null, type: ThunkStatus
)=>  {
	const isNotFetching = type === 'idle' || type === 'pending';
	if (!message || isNotFetching) return;
	
	toast[type === 'fulfilled' ? 'success' : 'error'](message, {
		duration: 5000,
		style: {
			color: "#000",
			backgroundColor: type === 'fulfilled' ? '#bbf7d0' : '#fecaca' // bg-green-100 / bg-red-100
		}
	});
}