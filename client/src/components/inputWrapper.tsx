import { forwardRef, ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';
import { clsx } from 'clsx';
import { InputConfig } from '@/lib/types';
import { InputError } from '@/components/formError';
import { Input } from '@/ui/index';

type InputWrapperProps = {
	conf: InputConfig;
	error?: FieldError | undefined;
	className?: string;
} & Omit<ComponentProps<typeof Input>, 'ref'>;

export default forwardRef<HTMLInputElement, InputWrapperProps>(
	function InputWrapper(props, ref) {
		return (
			<div>
				{/* label */}
				{props.conf.label && (
					<label
						htmlFor={props.name}
						className={clsx('mb-1 block text-xs font-medium', {
							'text-red-500': props.error
						})}
					>
						{props.conf.label}
					</label>
				)}
				
				{/* input */}
				<Input
					{...props}
					ref={ref}
					id={props.name}
					className={clsx(props.className,
						{ 'bg-white': props },
						{ 'bg-gray-100/90': props.disabled },
						{ 'border-red-500 focus-visible:border-foreground/20': props.error },
						{ 'focus:outline-none': props.readOnly }
					)}
					placeholder={props.conf.placeholder}
					aria-describedby={`${props.name}-error`}
				/>
				
				{/* error */}
				{props.error && (
					<InputError
						id={`${props.name}-error`}
						message={props.error.message}
					/>
				)}
			</div>
		);
	});