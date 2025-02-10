import { forwardRef, ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';
import clsx from 'clsx';
import { Input } from '../ui/index.ts';
import FormError from './form-error.tsx';

type InputWrapperProps = {
	label?: string
	keyfield: string
	labelStyle?: string
	error?: FieldError | undefined
} & ComponentProps<typeof Input>

export default forwardRef<HTMLInputElement, InputWrapperProps>(function InputWrapper(
	{ label, keyfield, labelStyle, error, ...rest },
	ref
) {
	return (
		<div>
			{label && (
				<label
					htmlFor={keyfield}
					className={clsx('mb-1 block text-xs', labelStyle)}
				>
					{label}
				</label>
			)}
			
			<Input
				{...rest}
				ref={ref}
				id={keyfield}
				aria-describedby={`${keyfield}-error`}
			/>
			
			{error && (
				<FormError id={`${keyfield}-error`} error={error.message}/>
			)}
		</div>
	);
})