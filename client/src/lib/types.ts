import { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

export type InputConfig = {
	label?: string;
	placeholder?: string;
	readOnly?: boolean;
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