import { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Doctor, Patient, User } from '@/lib/definitions';

export type Entity = User | Doctor | Patient;

export type ServiceType = {
	title: string;
	icon: LucideIcon;
	link: string;
	description: {
		min: string;
		exp: string;
	};
	servicesOffered: string[];
};

export type InputConfig = {
	label?: string;
	readOnly?: boolean;
	placeholder?: string;
	subscriptNum?: string;
};

export type FieldConfig = {
	name: string;
	type?: string;
	label: string;
	isSelect?: boolean;
	disabled?: boolean;
	placeholder?: string;
	options?: { label: string; value: string }[] | [];
};

export type SidebarRoutes = {
	path: string;
	icon?: LucideIcon;
	name?: string;
	component: FC;
};

export type ThunkStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';
export type ThunkError = string | null;