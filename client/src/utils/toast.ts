import { toast } from 'react-hot-toast';
import { ThunkStatus } from '@/lib/types';

export const showToast = (
	message: string | null, type: ThunkStatus
)=>  {
	const hasNotResponded = type === 'idle' || type === 'pending';
	if (!message || hasNotResponded) return;
	
	// define colors - green for success, red for error
	const colors = {
		success: { text: '#085d00', border: '#5cb85c', background: '#ebfdf0' },
		error: { text: '#7f1d1d', border: '#ef4444', background: '#fef2f2' }
	};
	
	const colorSet = type === 'fulfilled' ? colors.success : colors.error;
	
	toast[type === 'fulfilled' ? 'success' : 'error'](message, {
		duration: 3_500,
		style: {
			fontSize: 'small',
			color: colorSet.text,
			borderRadius: '10px',
			backgroundColor: colorSet.background,
			border: `1px dashed ${colorSet.border}`
		}
	});
}