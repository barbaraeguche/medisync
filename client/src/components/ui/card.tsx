import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

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
	title: string | ReactNode,
	description?: string
}) {
	return (
		<div className={'mb-6'}>
			<div className={'text-xl font-bold'}>
				{title}
			</div>
			<div className={'text-sm text-muted-foreground'}>
				{description}
			</div>
		</div>
	);
}

function CardContent({ children, className }: {
	children: ReactNode,
	className?: string
}) {
	return (
		<div className={cn('space-y-6', className)}>
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