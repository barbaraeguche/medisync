export const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const phoneNumberRegex: RegExp = /^(\(\d{3}\) |\d{3}-?)\d{3}-?\d{4}$/;
export const postalCode: RegExp = /^[a-z][0-9][a-z]\s?[0-9][a-z][0-9]$/i;

export const canadianProvinces = [
	'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
] as const;