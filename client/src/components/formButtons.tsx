import { FieldValues, UseFormReset } from 'react-hook-form';
import { Button } from '@/ui/index';

export default function FormButtons<T extends FieldValues>({ isEditing, setIsEditing, reset }: {
	isEditing: boolean,
	setIsEditing: (value: boolean) => void,
	reset: UseFormReset<T>
}) {
	return (
		<div className={'flex flex-col gap-2 sm:flex-row sm:justify-end'}>
			{isEditing ? (
				<>
					<Button
						type={'submit'}
						variant={'form'}
					>
						Save Changes
					</Button>
					
					<Button
						variant={'outline'}
						type={'button'}
						onClick={() => {
							reset();
							setIsEditing(false)
						}}
					>
						Cancel
					</Button>
				</>
			) : (
				<Button
					variant={'form'}
					onClick={() => setIsEditing(true)}
				>
          Edit Details
        </Button>
			)}
		</div>
	);
}