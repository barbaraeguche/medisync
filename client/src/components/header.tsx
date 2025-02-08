import { Link, NavLink } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Button from '../ui/button.tsx';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className={'container flex h-16 items-center justify-between'}>
				<Link to={'/'} className={'flex items-center gap-x-2'}>
					<Heart className={'size-6 text-teal-600 animate-pulse'}/>
					<span className={'text-xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent'}>
						Quantum Care
					</span>
				</Link>
				<nav className={'hidden md:flex gap-6'}>
					{['Services', 'How It Works', 'Our Doctors', 'Contact'].map((item) => (
						<NavLink
							to={item.toLowerCase().trim().replace(/\s+/g, '-')}
							key={item}
							className={'text-sm font-medium relative group hover:text-teal-600'}
						>
							{item}
							<span className={'absolute inset-x-0 bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform'}/>
						</NavLink>
					))}
				</nav>
				<div className={'flex items-center gap-4'}>
					<Button variant={'ghost'} className={'hover:text-teal-600'}>
						Sign In
					</Button>
					<Button className={'bg-gradient-to-r from-primary to-teal-600 hover:opacity-90'}>Book Appointment</Button>
				</div>
			</div>
		</header>
	);
}