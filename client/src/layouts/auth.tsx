import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
	return (
		<div className={'flex items-center justify-center min-h-screen'}>
			<div className={'w-full max-w-[600px]'}>
				<Outlet/>
			</div>
		</div>
	);
}