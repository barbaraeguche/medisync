import { toast } from 'react-hot-toast';
import { ThunkStatus } from '@/lib/types';

export const showToast = (
	message: string | null, type: ThunkStatus
)=>  {
	const hasNotResponded = type === 'idle' || type === 'pending';
	if (!message || hasNotResponded) return;
	
	toast[type === 'fulfilled' ? 'success' : 'error'](message, {
		duration: 7_000,
		style: {
			color: '#000',
			fontSize: 'small',
			backgroundColor: type === 'fulfilled' ? 'oklch(0.982 0.018 155.826)' : 'oklch(0.971 0.013 17.38)',
			border: `1px dashed ${type === 'fulfilled' ? 'oklch(0.925 0.084 155.995)' : 'oklch(0.885 0.062 18.334)'}`
		}
	});
}