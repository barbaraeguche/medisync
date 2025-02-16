import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...args: ClassValue[]) {
	return twMerge(clsx(args));
}

export const generatePagination = (currentPage: number, totalPages: number): (string | number)[] => {
	// if there are only five pages
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, idx) => idx + 1);
	}
	
	// if the current page is within the first three or last three pages
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}
	
	// if the current page is in the middle
	return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export const generateCurrentWeek = () => {
	const currentWeek = [];
	
	for (let idx = 1; idx <= 7; idx++) {
		// generate the next day from current day; appointments are booked in advance
		const day = new Date(Date.now() + (idx * 24 * 60 * 60 * 1000));
		
		// format: yyyy-mm-dd
		const date = day.toISOString().split('T')[0];
		
		// format: weekday, mm dd, yyyy
		const formattedDate = `${day.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})}`;
		
		currentWeek.push({ date, formattedDate });
	}
	
	return currentWeek;
};