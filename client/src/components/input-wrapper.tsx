import { forwardRef, ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '../utils/utils.ts';
import { Input, Select } from '../ui/index.ts';
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

export default forwardRef<HTMLSelectElement | HTMLInputElement, InputWrapperProps>(function InputWrapper(
	{ keyfield, conf, error, className, ...rest },
	ref
) {
	return (
		<div>
			{/* label */}
			{conf.label && (
				<label
					htmlFor={keyfield}
					className={cn('mb-1 block text-xs', conf.labelStyle)}
				>
					{conf.label}
				</label>
			)}
			
			{/* input */}
			{conf.type === 'select' ? (
				<Select ref={ref} options={conf.options}/>
				) : (
				<Input
					{...rest}
					ref={ref}
					id={keyfield}
					type={conf.type}
					className={className}
					placeholder={conf.placeholder}
					aria-describedby={`${keyfield}-error`}
				/>
			)}
			
			{/* error */}
			{error && (
				<FormError id={`${keyfield}-error`} error={error.message}/>
			)}
		</div>
	);
})