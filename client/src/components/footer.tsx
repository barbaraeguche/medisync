import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { footerLinks } from '../lib/data.ts';

export default function Footer() {
	return (
		<footer className={'border-t'}>
			<div className={'container flex flex-col gap-8 py-12 md:flex-row md:justify-between'}>
				<div className={'space-y-4'}>
					<div className={'flex items-center space-x-2'}>
						<Heart className={'size-6 text-teal-600'}/>
						<span className={'text-xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent'}>
					    Quantum Care
						</span>
					</div>
					<p className={'text-sm text-gray-500 dark:text-gray-400 max-w-[300px]'}>
						Transforming healthcare delivery through innovative telehealth solutions.
					</p>
				</div>
				<div className={'grid grid-cols-2 gap-12 sm:grid-cols-3'}>
					{footerLinks.map((section) => (
						<div key={section.title} className={'space-y-4'}>
							<h3 className={'text-sm font-medium'}>{section.title}</h3>
							<nav className={'flex flex-col space-y-2'}>
								{section.links.map((link) => (
									<Link to={link.href}
									      key={link.title}
									      className={'text-sm text-gray-500 hover:text-teal-600 dark:text-gray-400'}
									>
										{link.title}
									</Link>
								))}
							</nav>
						</div>
					))}
				</div>
			</div>
			<div className={'border-t'}>
				<div className={'container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between'}>
					<p className={'text-sm text-gray-500 dark:text-gray-400'}>
						&copy; 2025 TeleCare. All rights reserved.
					</p>
					<div className={'flex gap-4'}>
						{['Terms', 'Privacy', 'Cookies'].map((item) => (
							<Link to={'#'} key={item} className={'text-sm text-gray-500 hover:text-teal-600 dark:text-gray-400'}>
								{item}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}