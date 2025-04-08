import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { SidebarRoutes } from '@/lib/types';
import {
	adminRoutes, userRoutes, doctorRoutes, patientRoutes
} from '@/routes';

export default function Sidebar() {
	const { role } = useAppSelector((state) => state.userSlice.user);
	
	const userNav = [...userRoutes];
	const roleNav = [...(
		role === 'Admin' ? adminRoutes
			: role === 'Doctor' ? doctorRoutes
				: role === 'Patient' ? patientRoutes
					: []
	)];
	
	return (
		<div className={'w-64 h-full border-r border-gray-200 overflow-hidden'}>
			<nav>
				<NavItems title={'User'} navArr={userNav}/>
				<NavItems title={role} navArr={roleNav}/>
			</nav>
		</div>
	);
}

function NavItems({ title, navArr }: {
	title: string,
	navArr: SidebarRoutes[] | []
}) {
	if (!navArr.length) return null;
	
	return (
		<div className={'space-y-1 px-2 py-4'}>
			<h4 className={'px-4 py-2 text-gray-500 text-xs'}>{title}</h4>
			{navArr.map((item, idx) => {
				const Icon = item.icon;
				
				return (
					<NavLink
						key={idx}
						to={item.path}
						className={({ isActive }) =>
							`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
								isActive
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
							}`
						}
					>
						{Icon && <Icon size={18}/>}
						<span className={'ml-3 whitespace-nowrap'}>{item.name}</span>
					</NavLink>
				);
			})}
		</div>
	);
}