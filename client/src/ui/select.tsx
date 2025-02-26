import {
	Control, FieldValues, Path, FieldError, useController
} from 'react-hook-form';
import { SelectProps } from '@radix-ui/react-select';
import {
	Select, SelectContent, SelectTrigger, SelectItem, SelectValue
} from '@/ui/shadcn/select';
import { clsx } from 'clsx';
import { cn } from '@/utils/utils';
import { InputConfig } from '@/lib/definitions';
import { InputError } from '@/components/formError';

type CustomSelectProps<T extends FieldValues> = {
	conf: InputConfig;
	name: Path<T>;
	control: Control<T>;
	options: { label: string; value: string }[] | [];
	error?: FieldError | undefined;
} & Omit<SelectProps, 'onValueChange' | 'value'>;

export default function CustomSelect<T extends FieldValues>(props: CustomSelectProps<T>) {
	return (
		<div>
			{/* label */}
			{props.conf.label && (
				<label
					htmlFor={props.name}
					className={clsx(
						cn('mb-1 block text-xs font-medium', props.conf.labelStyle), {
							'text-red-500 font-medium': props.error
						}
					)}
				>
					{props.conf.label}
				</label>
			)}
			
			{/* input */}
			<div aria-describedby={`${props.name}-error`}>
				<SelectInput {...props}/>
			</div>
			
			{/* error */}
			{props.error && (
				<InputError
					id={`${props.name}-error`}
					message={props.error.message}
				/>
			)}
		</div>
	);
}

function SelectInput<T extends FieldValues>({ name, control, ...props }: CustomSelectProps<T>) {
	const {
		field: { value, onChange }
	} = useController({
		name, control
	});
	
	return (
		<Select
			{...props}
			value={value ?? ''}
			onValueChange={onChange}
		>
			<SelectTrigger
				id={name}
				className={clsx('bg-white', {
					'border-red-500 focus:border-foreground/20': props.error
				})}
			>
				<SelectValue placeholder={props.conf.placeholder ?? 'Select an option'}/>
			</SelectTrigger>
			<SelectContent>
				{props.options.length ? (
					props.options.map((opt) => (
						<SelectItem
							key={opt.value}
							value={opt.value}
						>
							{opt.label}
						</SelectItem>
					))
				) : (
					<SelectItem
						value={'#'}
						disabled
					>
						No options available
					</SelectItem>
				)}
			</SelectContent>
		</Select>
	);
}