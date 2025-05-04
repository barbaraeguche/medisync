import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditableState } from '@/hooks/useEditableState';
import { FieldConfig } from '@/lib/types';
import InputWrapper from '@/components/input-wrapper';
import FormButton from '@/components/form-button';
import { Card, Select } from '@/components/ui';

interface EditableFormProps<T extends Record<string, any>> {
	title: string;
	initialValues?: T;
	schema: ZodSchema;
	fields: FieldConfig[];
	onSubmit: (data: T) => void;
	readOnlyFields?: string[];
}

export default function EditableForm<T extends Record<string, any>>(
	{ title, initialValues, schema, fields, onSubmit, readOnlyFields = [] }: EditableFormProps<T>
) {
	const { isEditing, setIsEditing } = useEditableState();
	
	const {
		register, handleSubmit, formState: {
			errors, isDirty, isSubmitting
		}, control, reset
	} = useForm<T>({
		resolver: zodResolver(schema),
		reValidateMode: 'onBlur',
		values: initialValues
	});
	
	const formSubmit: SubmitHandler<T> = async (data) => {
		if (!isDirty) return;
		
		// if any changes were made
		await onSubmit(data);
		reset(data);
		setIsEditing(false);
	};
	
	return (
		<form onSubmit={handleSubmit(formSubmit)}>
			<Card>
				<Card.Header title={title}/>
				
				<Card.Content>
					{fields.map((field) => (
						field.isSelect ? (
							<Select
								key={field.name}
								disabled={!isEditing}
								conf={{
									label: field.label,
                  readOnly: !isEditing,
									placeholder: field.placeholder
								}}
								control={control}
								name={field.name as any}
								options={field.options!}
								error={errors[field.name] as FieldError | undefined}
							/>
						) : (
							<InputWrapper
								key={field.name}
								type={field.type}
								disabled={field.disabled}
								{...register(field.name as any)}
								conf={{
									label: field.label,
									placeholder: field.placeholder
								}}
								name={field.name}
								error={errors[field.name] as FieldError | undefined}
								readOnly={!isEditing || readOnlyFields?.includes(field.name)}
							/>
						)
					))}
				</Card.Content>
				
				<Card.Footer>
					<FormButton<T>
						reset={reset}
						isEditing={isEditing}
						isPending={isSubmitting}
						setIsEditing={setIsEditing}
					/>
				</Card.Footer>
			</Card>
		</form>
	);
}