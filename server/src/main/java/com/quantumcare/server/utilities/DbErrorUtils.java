package com.quantumcare.server.utilities;

import org.springframework.dao.DataIntegrityViolationException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * utility class for handling database errors and generating user-friendly error messages.
 */
public class DbErrorUtils {
	public static String getErrorMessage(DataIntegrityViolationException exp) {
		String errorMessage = "Registration failed: ";
		
		try {
			if (exp.getCause() == null) return errorMessage + "Duplicate entry detected.";
			
			String causeMessage = exp.getCause().getMessage();
			
			/*
			 * try to extract detail from PostgreSQL error message pattern
			 * pattern: Detail: Key (column)=(value) already exists.
			 */
			if (causeMessage != null) {
				int detailIndex = causeMessage.indexOf("Detail: Key ");
				
				if (detailIndex >= 0) {
					String detail = causeMessage.substring(detailIndex);
					
					// use regex to extract field name and value
					Pattern pattern = Pattern.compile("Key \\(([^)]+)\\)=\\(([^)]+)\\)");
					Matcher matcher = pattern.matcher(detail);
					
					if (matcher.find()) {
						String field = matcher.group(1); // the field name
						String value = matcher.group(2); // the value that caused the duplicate
						
						return buildFieldSpecificErrorMessage(errorMessage, field, value);
					}
				}
				// fallback: check for common constraint terms in the message
				return buildGenericErrorMessage(errorMessage, causeMessage);
			}
		} catch (Exception _) {}
		
		return errorMessage + "Duplicate entry detected.";
	}
	
	// builds a field-specific error message based on the extracted field name and value.
	private static String buildFieldSpecificErrorMessage(String baseMessage, String field, String value) {
		return baseMessage + switch (field) {
			case "email" -> "Email address '" + value + "' is already in use.";
			case "phone_number" -> "Phone number '" + value + "' is already in use.";
			case "license_number" -> "License number '" + value + "' is already in use.";
			case null, default -> "'" + field + "' with value '" + value + "' is already in use.";
		};
	}
	
	// builds a more generic error message based on the exception message when detailed parsing fails.
	private static String buildGenericErrorMessage(String baseMessage, String exceptionMessage) {
		String lowercaseMessage = exceptionMessage.toLowerCase();
		
		if (lowercaseMessage.contains("email")) {
			return baseMessage + "Email address is already in use.";
		} else if (lowercaseMessage.contains("phone")) {
			return baseMessage + "Phone number is already in use.";
		} else if (lowercaseMessage.contains("license")) {
			return baseMessage + "License number is already in use.";
		} else if (lowercaseMessage.contains("unique") || lowercaseMessage.contains("duplicate")) {
			return baseMessage + "A record with the same unique identifier already exists.";
		} else {
			return baseMessage + "Duplicate entry detected.";
		}
	}
}
