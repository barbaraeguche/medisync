// mainly for user
export const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#^!%*?&])[A-Za-z\d@$#^!%*?&]{8,}$/;
export const phoneNumberRegex: RegExp = /^(\(\d{3}\) |\d{3}-?)\d{3}-?\d{4}$/;
export const postalCodeRegex: RegExp = /^[a-z][0-9][a-z]\s?[0-9][a-z][0-9]$/i;