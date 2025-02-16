import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

export default function CardLayout({ children, className }: {
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