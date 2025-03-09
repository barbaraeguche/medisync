import { ShieldX } from 'lucide-react';

export function InputError({ id, message }: {
	id: string,
	message: string | undefined
}) {
	return (
		<p
			id={id}
			aria-live={'polite'}
			aria-atomic={'true'}
			className={'mt-1 text-xs text-red-600'}
		>
			{message}
		</p>
	);
}

export function ServerError({ message }: {
	message: string | null | undefined
}) {
	if (!message) return;
	
	return (
		<p
			aria-live={'polite'}
			aria-atomic={'true'}
			className={'flex items-center gap-x-1 text-sm text-red-600'}
		>
			<ShieldX className={'size-5'}/> {message}
		</p>
	);
}