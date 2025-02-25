import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
	return (
		<div className={'w-full h-screen flex items-center justify-center'}>
			<div className={'container py-6'}>
				<Outlet/>
			</div>
		</div>
	);
}