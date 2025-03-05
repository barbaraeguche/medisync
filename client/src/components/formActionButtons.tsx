import { FieldValues, UseFormReset } from 'react-hook-form';
import { Button } from '@/ui/index';

export default function FormActionButtons<T extends FieldValues>({ reset, isEditing, setIsEditing }: {
	reset: UseFormReset<T>
	isEditing: boolean,
	setIsEditing: (value: boolean) => void,
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
							reset(); // reset any edit done
							setIsEditing(false);
						}}
					>
						Cancel
					</Button>
				</>
			) : (
				<Button
					variant={'form'}
					onClick={(e) => {
						e.preventDefault(); // to stop dispatch
						setIsEditing(true);
					}}
				>
          Edit Details
        </Button>
			)}
		</div>
	);
}