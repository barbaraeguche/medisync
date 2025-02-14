import { Button } from '@/ui/index';

export default function FormButtons() {
	return (
		<div className={'flex flex-col gap-2 sm:flex-row sm:justify-end'}>
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