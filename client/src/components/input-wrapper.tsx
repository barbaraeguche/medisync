import { forwardRef, ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';
import { clsx } from 'clsx';
import { cn } from '@/utils/utils';
import { InputConfig } from '@/lib/definitions';
import FormError from './form-error';
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
				<Input
					{...props}
					ref={ref}
					id={props.name}
					className={clsx(props.className,
						{ 'bg-white': props },
						{ 'bg-gray-200/70': props.disabled },
						{ 'border-red-500 focus-visible:border-foreground/20': props.error }
					)}
					placeholder={props.conf.placeholder}
					aria-describedby={`${props.name}-error`}
				/>
				
				{/* error */}
				{props.error && (
					<FormError id={`${props.name}-error`} error={props.error.message}/>
				)}
			</div>
		);
	});