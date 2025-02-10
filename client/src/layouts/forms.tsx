import { ReactNode } from 'react';

export default function FormLayout({ children }: {
	children: ReactNode
}) {
	return (
		<div className={'max-w-[600px] rounded-lg bg-gray-50/50 p-3 md:p-5 space-y-4'}>
			{children}
		</div>
	);
}