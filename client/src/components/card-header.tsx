export default function CardHeader({ title, description }: {
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