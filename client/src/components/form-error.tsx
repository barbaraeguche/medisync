export default function FormError({ id, error }: {
	id: string,
	error: string | undefined
}) {
	return (
		<p
			id={id}
			aria-live={'polite'}
			aria-atomic={'true'}
			className={'mt-1 text-xs text-red-600'}
		>
			{error}
		</p>
	);
}