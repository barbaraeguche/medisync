import { Button } from '@/ui/index';
import { clsx } from 'clsx';

export default function FormButtons({ isEditing }: {
	isEditing?: boolean
}) {
	return (
		<div className={clsx(
			'flex flex-col gap-2 sm:flex-row sm:justify-end',
			{ 'hidden': isEditing }
		)}>
			<Button
				type={'submit'}
				variant={'form'}
			>
				Save Changes
			</Button>
			
			<Button variant={'outline'}>
				Cancel
			</Button>
		</div>
	);
}