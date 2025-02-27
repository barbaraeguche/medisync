import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout() {
	return (
		<div className={'flex h-full bg-background'}>
			<div className={'min-h-dvh'}>
				<Sidebar/>
			</div>
			<main className={'grow flex-1 overflow-y-auto'}>
				<div className={'container py-6'}>
					<Outlet/>
				</div>
			</main>
		</div>
	);
}