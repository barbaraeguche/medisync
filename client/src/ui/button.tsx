import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils.ts';

const buttonVariants = cva(
	'shadow-xs inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50', {
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline: "border border-input hover:bg-gray-100",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/50",
				form: "bg-accent-foreground hover:bg-accent",
				link: "text-primary underline-offset-4 hover:underline shadow-none"
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 px-3",
				lg: "h-11 px-8",
				icon: "h-8 w-8"
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	className?: string;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(
	function Button({ variant, size, ...props }, ref) {
		return (
			<button
				{...props}
				ref={ref}
				type={'button'}
				className={cn(buttonVariants({ variant, size }), props.className)}
			>
				{props.children}
			</button>
		);
	});