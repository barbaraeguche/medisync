export default function FormHeader({ title }: {
	title: string
}) {
	return (
		<h3 className={'text-xl font-bold mb-6'}>
			{title}
		</h3>
	);
}