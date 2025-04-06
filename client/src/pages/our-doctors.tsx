import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { boardDoctors } from '@/lib/placeholders';
import { Button, Card } from '@/components/ui';

export default function OurDoctors() {
	const [initial, setInitial] = useState(5);
	const visibleBoardDoctors = boardDoctors.slice(0, initial);
	
	const handleLoadMore = () => {
		if (initial >= boardDoctors.length) return;
    setInitial((prev) => prev + 5);
  };
	
	return (
		<div className={'container mx-auto py-12 px-4'}>
			<div className={'text-center mb-16'}>
				<h1 className={'text-4xl font-bold mb-4 tracking-tighter'}>Our Healthcare Providers</h1>
				<p className={'text-xl text-muted-foreground max-w-3xl mx-auto'}>
					Meet our team of board-certified physicians dedicated to providing exceptional care through our telehealth
					platform.
				</p>
			</div>
			
			<div className={'bg-muted rounded-xl p-6 mb-12'}>
				<div className={'grid md:grid-cols-2 lg:grid-cols-3 gap-8'}>
					{visibleBoardDoctors.map((doctor, idx) => (
						<Card key={idx} className={'overflow-hidden'}>
							<div className={'relative h-64'}>
								<img alt={doctor.name} src={doctor.image} className={'object-cover'}/>
							</div>
							
							<div className={'flex justify-between items-start'}>
								<Card.Header
									title={doctor.name}
									description={doctor.specialty}
								/>
								<div className={'flex items-center gap-1 text-sm'}>
									<Star className={'h-3 w-3 fill-amber-300 text-primary'}/>
									{doctor.rating} ({doctor.reviewCount})
								</div>
							</div>
							
							<Card.Content className={'space-y-4'}>
								<p className={'tracking-tight'}>{doctor.bio}</p>
								<div className={'grid grid-cols-2 gap-y-1 text-sm'}>
									<span className={'text-muted-foreground'}>Education:</span>
									<div>{doctor.education}</div>
									
									<span className={'text-muted-foreground'}>Experience:</span>
									<div>{doctor.experience}</div>
									
									<span className={'text-muted-foreground'}>Languages:</span>
									<div>{doctor.languages}</div>
									
									<span className={'text-muted-foreground'}>Next Available:</span>
									<div className='font-medium text-primary'>Tomorrow</div>
								</div>
							</Card.Content>
						</Card>
					))}
				</div>
			</div>
			
			<div className={'mt-12 text-center'}>
				<Button
					size={'lg'}
					variant={'outline'}
					onClick={handleLoadMore}
				>
					Load More Doctors
				</Button>
			</div>
			
			<div className={'mt-20 bg-primary/10 rounded-xl p-8 text-center'}>
				<h2 className={'text-3xl font-bold mb-4'}>Join Our Medical Team</h2>
				<p className={'text-lg mb-8 max-w-2xl mx-auto'}>
					Are you a licensed healthcare provider interested in telehealth? Join our network of professionals and expand
					your practice through our platform.
				</p>
				<Link to={'/auth/register'}>
					<Button size={'lg'}>
						Apply as a Provider
					</Button>
				</Link>
			</div>
		</div>
	);
}