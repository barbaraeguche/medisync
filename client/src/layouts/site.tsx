import { ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function SiteLayout({ children }: {
	children: ReactNode
}) {
	return (
		<div className={'flex flex-col min-h-screen'}>
			<Header/>
			<div className={'flex-1'}>
				{children}
			</div>
			<Footer/>
		</div>
	);
}