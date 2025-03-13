package com.quantumcare.server.utilities;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class EntityUpdater {
	public static <T> void updateNonNullProperties(T source, T target) {
		// get property names to ignore (properties that are null in the source)
		String[] ignoreProperties = getNullPropertyNames(source);
		// copy non-null properties from source to target
		BeanUtils.copyProperties(source, target, ignoreProperties);
	}
	
	private static String[] getNullPropertyNames(Object source) {
		final BeanWrapper src = new BeanWrapperImpl(source);
		Set<String> emptyNames = new HashSet<>();
		
		// properties that we want to update even when null
		String[] allowNullUpdate = { "phoneNumber" };
		Set<String> allowNullUpdateSet = new HashSet<>(Arrays.asList(allowNullUpdate));
		
		for (var pd : src.getPropertyDescriptors()) {
			String propertyName = pd.getName();
			Object value = src.getPropertyValue(propertyName);
			
			if (value == null && !allowNullUpdateSet.contains(propertyName)) {
				emptyNames.add(propertyName);
			}
		}
		
		return emptyNames.toArray(new String[0]);
	}
}
