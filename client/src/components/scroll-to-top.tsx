import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { animate } from 'framer-motion';

export default function ScrollToTop() {
	const { pathname } = useLocation();
	
	useEffect(() => {
		animate(0, 0, {
			type: 'tween',
			ease: 'easeInOut',
			duration: 0.5,
			onUpdate: (value) => window.scrollTo(0, value)
		});
	}, [pathname]);
	
	return null;
}