import {
	Controller, Control, FieldValues, Path, FieldError
} from 'react-hook-form';
import {
	Select, SelectContent, SelectTrigger, SelectItem, SelectValue
} from '@/ui/shadcn/select.tsx';
import { clsx } from 'clsx';
import { cn } from '@/utils/utils.ts';
import { InputConfig } from '@/lib/definitions.ts';
import FormError from '@/components/form-error.tsx';

type CustomSelectProps<T extends FieldValues> = {
	conf: InputConfig
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
						cn('mb-1 block text-xs', props.conf.labelStyle), {
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

function SelectInput<T extends FieldValues>(props: CustomSelectProps<T>) {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field }) => (
				<Select
					onValueChange={field.onChange}
					value={field.value ?? ''}
				>
					<SelectTrigger
						id={props.name}
						className={`${props.error && 'border-red-500 !ring-0'}`}
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