import { FieldValues, UseFormReset } from 'react-hook-form';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui';

export default function FormButton<T extends FieldValues>({ reset, isPending, isEditing, setIsEditing }: {
	reset: UseFormReset<T>
	isPending: boolean,
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
						disabled={isPending}
						aria-label={'Save Changes'}
					>
						{isPending && <Spinner/>}
						Save Changes
					</Button>
					
					<Button
						variant={'outline'}
						onClick={() => {
							reset(); // reset any edit done
							setIsEditing(false);
						}}
						aria-label={'Cancel Changes'}
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
					aria-label={'Make Changes'}
				>
          Edit Details
        </Button>
			)}
		</div>
	);
}