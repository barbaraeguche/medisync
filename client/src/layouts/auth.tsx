import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
	return (
		<div className={'flex items-center justify-center min-h-screen'}>
			<div className={'px-2 py-10 w-full max-w-[600px]'}>
				<Outlet/>
			</div>
		</div>
	);
}