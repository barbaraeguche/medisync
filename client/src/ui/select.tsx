import {
	Controller, Control, FieldValues, Path, FieldError
} from 'react-hook-form';
import { SelectProps } from '@radix-ui/react-select';
import {
	Select, SelectContent, SelectTrigger, SelectItem, SelectValue
} from '@/ui/shadcn/select';
import { clsx } from 'clsx';
import { cn } from '@/utils/utils';
import { InputConfig } from '@/lib/definitions';
import FormError from '@/components/form-error';

type CustomSelectProps<T extends FieldValues> = SelectProps & {
	conf: InputConfig;
	name: Path<T>;
	control: Control<T>;
	options: { label: string; value: string }[];
	error?: FieldError | undefined;
};

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
				<FormError id={`${props.name}-error`} error={props.error.message}/>
			)}
		</div>
	);
}

// TODO: optimize here, use `useController instead`
function SelectInput<T extends FieldValues>(props: CustomSelectProps<T>) {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field }) => (
				<Select
					{...props}
					value={field.value ?? ''}
					onValueChange={field.onChange}
				>
					<SelectTrigger
						id={props.name}
						className={`${props.error && 'border-red-500 focus:border-foreground/20'}`}
					>
						<SelectValue placeholder={props.conf.placeholder ?? 'Select an option'}/>
					</SelectTrigger>
					<SelectContent>
						{props.options.map((opt) => (
							<SelectItem
								key={opt.value}
								value={opt.value}
							>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		/>
	);
}