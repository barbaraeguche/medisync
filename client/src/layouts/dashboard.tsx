import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout() {
	return (
		<div className={'flex h-full bg-background'}>
			<div className={'min-h-dvh hidden lg:block'}>
				<Sidebar/>
			</div>
			<main className={'grow flex-1 overflow-y-auto mb-20 sm:mb-40'}>
				<div className={'px-2 py-10 sm:mx-0 sm:my-0 sm:p-[2rem] xl:p-[4rem]'}>
					<Outlet/>
				</div>
			</main>
		</div>
	);
}