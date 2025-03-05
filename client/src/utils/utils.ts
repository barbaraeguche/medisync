import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import {
	format, parse, differenceInHours, parseISO, isBefore, isToday
} from 'date-fns';
import { enCA } from 'date-fns/locale';
import { yyyy_MM_dd, EEEE_MMM_dd_yyyy } from '@/utils/constants.ts';

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

export const formatDate = (date: string | Date, formatStr: string = yyyy_MM_dd) => {
	const parsedDate = date instanceof Date ? date : parseISO(date);
	return format(parsedDate, formatStr, {
		locale: enCA
	});
};

export const strToDate = (date: string, formatStr: string = yyyy_MM_dd) => {
	return parse(date, formatStr, new Date());
};

const generateCurrentWeek = () => {
	return Array.from({ length: 7 }, (_, idx) => {
		/*
		* generate the next day from current week
		* appointments are booked 2 days in advance to allow patients to book a day before at latest
		*/
		const date = new Date();
		date.setDate(date.getDate() + idx + 2);
		
		return {
			date: formatDate(date),
			displayDate: formatDate(date, EEEE_MMM_dd_yyyy)
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

export const generateTimeSlots = (formerHr: string, latterHr: string) => {
	// define a reference date (since we're only working with time)
	const referenceDate = '1900-01-01';
	const formatStr = 'yyyy-MM-dd HH:mm';
	
	const endTime = strToDate(`${referenceDate} ${formerHr}`, formatStr);
	const startTime = strToDate(`${referenceDate} ${latterHr}`, formatStr);
	
	// get the number of hours between them
	const difference = differenceInHours(endTime, startTime);
	
	return Array.from({ length: difference }, (_, idx) => {
		// generate hourly intervals
		const time = `${startTime.getHours() + idx}:00`;
		return generateLabelValue(time);
	});
};

export const generateLabelValue = (itemValue: string, itemLabel?: string) =>
	({ label: itemLabel ?? itemValue, value: itemValue });

export const categorizeAppointments = <T extends { date: string | Date }>(appointments: T[]) => {
	const now = new Date();
	
	return appointments.reduce<{ past: T[]; current: T[]; upcoming: T[] }>(
		(accumulator, appointment) => {
			const apptDate = typeof appointment.date === 'string' ? parseISO(appointment.date) : appointment.date;
			
			if (isBefore(apptDate, now) && !isToday(apptDate)) {
				accumulator.past.push(appointment);
			} else if (isToday(apptDate)) {
				accumulator.current.push(appointment);
			} else {
				accumulator.upcoming.push(appointment);
			}
			
			return accumulator;
		},
		{ past: [], current: [], upcoming: [] }
	);
};