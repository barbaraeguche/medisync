import { ReactNode } from 'react';
import { cn } from '@/utils/utils.ts';

export default function Card({ children, className }: {
	children: ReactNode,
	className?: string
}) {
	return (
		<div className={cn(
			'max-w-[600px] rounded-lg bg-gray-50/50 p-3 md:p-5 space-y-4 shadow-sm',
			className
		)}>
			{children}
		</div>
	);
}

function CardHeader({ title, description }: {
	title: string,
	description?: string
}) {
	return (
		<div className={'mb-6'}>
			<h3 className={'text-xl font-bold'}>
				{title}
			</h3>
			<p className={'text-sm text-gray-600'}>
				{description}
			</p>
		</div>
	);
}

function CardContent({ children, className }: {
	children: ReactNode,
	className?: string
}) {
	return (
		<div className={cn('space-y-4', className)}>
			{children}
		</div>
	);
}

function CardFooter({ children, className }: {
	children: ReactNode,
	className?: string
}) {
	return (
		<div className={cn('', className)}>
			{children}
		</div>
	);
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;