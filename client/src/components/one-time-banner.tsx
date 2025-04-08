import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function OneTimeBanner() {
	const [showBanner, setShowBanner] = useState(false);
	
	useEffect(() => {
		const seen = localStorage.getItem('bannerDismissed');
		if (!seen) setShowBanner(true);
	}, []);
	
	const dismissBanner = () => {
		localStorage.setItem('bannerDismissed', 'true');
		setShowBanner(false);
	};
	
	if (!showBanner) return null;
	
	return (
		<>
			{/* overlay */}
			<div className={'fixed inset-0 bg-black/10 backdrop-blur-sm z-40'}/>
			<div className={'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'}>
				<Card className={'w-[90vw] max-w-lg border-2 border-teal-600 shadow-xl backdrop-blur-lg bg-white/90'}>
					<div className={'flex justify-between items-start m-0'}>
						<Card.Header title={'⚠️ Demo Only — Not a Real Site'}/>
						<Button
							size={'icon'}
							variant={'outline'}
							className={'group'}
							onClick={dismissBanner}
						>
							<X size={18} className={'group-hover:text-teal-600'}/>
						</Button>
					</div>
					<Card.Content className={'text-sm'}>
						Disclaimer: This website is not a real service or product.
						<br/><br/>
						It is a personal project built to demonstrate my abilities in full-stack web development, including frontend
						design, backend APIs, database integration, and much more.
						<br/><br/>
						All content is for demonstration purposes only.
					</Card.Content>
				</Card>
			</div>
		</>
	);
}