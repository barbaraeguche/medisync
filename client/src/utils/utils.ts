import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { enCA } from 'date-fns/locale';

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

export const formatDate = (date: string | Date) => {
	return format(date, 'EEEE, MMM dd yyyy', {
		locale: enCA
	});
}

const generateCurrentWeek = () => {
	return Array.from({ length: 7 }, (_, idx) => {
		// generate the next day from current day; appointments are booked in advance
		const date = new Date();
		date.setDate(date.getDate() + idx + 1);
		
		return {
			date: format(date, 'yyyy-MM-dd'),
			displayDate: formatDate(date)
		};
	});
};

export const getCurrentWeek = () => {
	return generateCurrentWeek().reduce<[string[], string[]]>(
		([dateArr, displayedArr], { date, displayDate }) => {
			dateArr.push(date);
			displayedArr.push(displayDate);
			return [dateArr, displayedArr];
		},
		[[], []]
	);
};