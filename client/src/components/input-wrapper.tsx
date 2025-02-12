import { forwardRef, ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';
import { clsx } from 'clsx';
import { cn } from '../utils/utils.ts';
import { Input } from '../ui/index.ts';
import FormError from './form-error.tsx';

type Configuration = {
	type?: string
	label?: string
	labelStyle?: string
	placeholder?: string
	options?: { value: string, label: string }[]
}

type InputWrapperProps = {
	keyfield: string
	conf: Configuration
	error?: FieldError | undefined
	className?: string
} & Omit<ComponentProps<typeof Input>, 'ref'>

export default forwardRef<HTMLInputElement, InputWrapperProps>(function InputWrapper(
	{ keyfield, conf, error, className, ...rest },
	ref
) {
	return (
		<div>
			{/* label */}
			{conf.label && (
				<label
					htmlFor={keyfield}
					className={clsx(
						cn('mb-1 block text-xs', conf.labelStyle), {
							'text-red-500 font-medium': error
						}
					)}
				>
					{conf.label}
				</label>
			)}
			
			{/* input */}
			<Input
				{...rest}
				ref={ref}
				id={keyfield}
				type={conf.type}
				className={clsx(className, {
					'border-red-500': error
				})}
				placeholder={conf.placeholder}
				aria-describedby={`${keyfield}-error`}
			/>
			
			{/* error */}
			{error && (
				<FormError id={`${keyfield}-error`} error={error.message}/>
			)}
		</div>
	);
})