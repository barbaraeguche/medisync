import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useNavItems } from '@/hooks/useNavItems';
import NavItems from '@/components/nav-items';
import { Accordion, Button, Sheet } from '@/components/ui';
import { SignOutButton, SignInButton } from '@/ui/auth-buttons';

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	const { isAuthenticated, role, userNav, roleNav } = useNavItems();
	
	const homeNav = ['Services', 'How It Works', 'Our Doctors', 'Contact', 'Book Appointment'];
	
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<Sheet.Trigger asChild>
				<Button variant={'link'}>
					<Menu size={24}/>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content aria-description={'Navigation Menu'} className={'flex flex-col justify-between h-full w-[95vw]'}>
				<div className={'mt-7'}>
					{/* nav seen from >= lg */}
					<nav className={'space-y-1 px-2 py-4'}>
						{homeNav.map((item, idx) => {
							const isSkip = role === 'Doctor' && item === 'Book Appointment';
							if (isSkip) return null;
							
							return (
								<NavLink
									key={idx}
									onClick={() => setOpen(false)}
									to={item.toLowerCase().replace(/\s+/g, '-')}
									className={({ isActive }) =>
										`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
											isActive
												? 'bg-gray-100 text-gray-900'
												: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
										}`
									}
								>
									<span className={'whitespace-nowrap'}>{item}</span>
								</NavLink>
							);
						})}
					</nav>
					
					{/* account nav */}
					{isAuthenticated && (
						<div className={'px-6'}>
							<Accordion type={'single'} collapsible>
								<Accordion.Item value={'user-nav'}>
									<Accordion.Trigger>User</Accordion.Trigger>
									<Accordion.Content onClick={() => setOpen(false)}>
										<NavItems title={''} navArr={userNav}/>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
							
							<Accordion type={'single'} collapsible>
								<Accordion.Item value={'role-nav'}>
									<Accordion.Trigger>{role}</Accordion.Trigger>
									<Accordion.Content onClick={() => setOpen(false)}>
										<NavItems title={''} navArr={roleNav}/>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</div>
					)}
				</div>
				
				<div className={'px-4 pb-4 mt-auto'}>
					<div onClick={() => setOpen(false)} className={'w-full'}>
						{isAuthenticated ? <SignOutButton/> : <SignInButton/>}
					</div>
				</div>
			</Sheet.Content>
		</Sheet>
	);
}