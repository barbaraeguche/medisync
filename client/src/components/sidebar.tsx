import { useNavItems } from '@/hooks/useNavItems';
import NavItems from '@/components/nav-items';

export default function Sidebar() {
	const { role, userNav, roleNav } = useNavItems();
	
	return (
		<div className={'w-64 h-full border-r border-gray-200 overflow-hidden'}>
			<nav>
				<NavItems title={'User'} navArr={userNav}/>
				<NavItems title={role} navArr={roleNav}/>
			</nav>
		</div>
	);
}