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
				variant={'secondary'}
				className={'bg-accent-foreground hover:bg-accent'}
			>
				Save Changes
			</Button>
			
			<Button
				type={'button'}
				variant={'outline'}
			>
				Cancel
			</Button>
		</div>
	);
}