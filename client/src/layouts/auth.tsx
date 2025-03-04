import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
	return (
		<div className={'my-5 md:my-20'}>
			<div className={'w-full h-full flex items-center justify-center'}>
				<div className={'w-full max-w-[600px] py-[2rem]'}>
					<Outlet/>
				</div>
			</div>
		</div>
	);
}