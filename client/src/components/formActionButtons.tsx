import { FieldValues, UseFormReset } from 'react-hook-form';
import LoadingSpinner from '@/components/loading';
import { Button } from '@/ui/index';

export default function FormActionButtons<T extends FieldValues>({ isPending, reset, isEditing, setIsEditing }: {
	isPending: boolean,
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
						{isPending && <LoadingSpinner/>}
						Save Changes
					</Button>
					
					<Button
						variant={'outline'}
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