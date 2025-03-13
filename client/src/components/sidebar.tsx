import { ElementType, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { SidebarRoutes } from '@/lib/types';
import {
	adminRoutes, userRoutes, doctorRoutes, patientRoutes
} from '@/routes';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const { role } = useAppSelector((state) => state.userSlice.user);
	
	const userNav = [...userRoutes];
	const roleNav = [...(
		role === 'Admin' ? adminRoutes
			: role === 'Doctor' ? doctorRoutes
				: role === 'Patient' ? patientRoutes
					: []
	)];
	
	// handle responsive behavior
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) setIsOpen(true); // md breakpoint
			else setIsOpen(false);
		};
		
		// set initial state based on screen size
		handleResize();
		
		// add event listener, and clean up
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	const toggleSidebar = () => setIsOpen(!isOpen);
	
	return (
		<div className={'relative flex h-full z-20'}>
			{/* sidebar - always visible on md screens and up */}
			<div className={`transition-all duration-300 ease-in-out h-full ${
				isOpen ? 'w-64' : 'w-0 md:w-64'
			} ${
				window.innerWidth < 768 ? 'absolute left-0 top-0' : 'relative'
			}`}>
				<div className={'h-full bg-white border-r border-gray-200 overflow-hidden'}>
					{/* menu close button - hidden on md screens and up */}
					<div className={'flex justify-end'}>
						<ToggleBtn
							Icon={X}
							isClose={true}
							toggleSidebar={toggleSidebar}
						/>
					</div>
					
					<nav>
						<NavItems title={'User'} navArr={userNav}/>
						<NavItems title={role} navArr={roleNav}/>
					</nav>
				</div>
			</div>
			
			{/* menu open button - hidden on menu open, md screens and up */}
			{!isOpen && (
				<ToggleBtn
					Icon={Menu}
					toggleSidebar={toggleSidebar}
				/>
			)}
		</div>
	);
}

function ToggleBtn({ toggleSidebar, isClose, Icon }: {
	toggleSidebar: () => void,
	isClose?: boolean,
	Icon: ElementType
}) {
	return (
		<button
			onClick={toggleSidebar}
			className={`${isClose && 'md:hidden'} h-fit m-4 p-1 hover:cursor-pointer rounded-md hover:bg-gray-100`}
		>
			<Icon size={16}/>
		</button>
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