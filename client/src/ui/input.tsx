import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/utils.ts';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(
	function Input(
		{ className, ...rest }, ref
	) {
		return (
			<input {...rest}
			       ref={ref}
			       className={cn(
				       'w-full rounded-md p-2 border text-sm placeholder:text-gray-500 focus:placeholder:text-gray-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-foreground/40',
				       className
			       )}
			/>
		);
	});