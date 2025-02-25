import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { userRoutes, doctorRoutes, patientRoutes } from '@/routes';

export default function Sidebar() {
	const { role } = useAppSelector((state) => state.userSlice.user);
	
	const navItems = [...userRoutes];
	navItems.splice(1, 0, ...(role === 'Patient' ? patientRoutes : doctorRoutes));
	
	return (
		<div className={'w-64 h-full bg-white border-r border-gray-200'}>
			<nav className={'space-y-1 px-2 py-4'}>
				{navItems.map((item, idx) => {
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
							{Icon && <Icon className={'size-5'}/>}
							<span className="ml-3">{item.name}</span>
						</NavLink>
					);
				})}
			</nav>
		</div>
	);
}