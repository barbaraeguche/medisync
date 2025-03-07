package com.quantumcare.server.utilities;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.util.HashSet;
import java.util.Set;

public class EntityUpdater {
	public static <T> void updateNonNullProperties(T source, T target) {
		BeanUtils.copyProperties(source, target, getNullPropertyNames(source));
	}
	
	private static String[] getNullPropertyNames(Object source) {
		final BeanWrapper src = new BeanWrapperImpl(source);
		Set<String> emptyNames = new HashSet<>();
		
		for (var pd : src.getPropertyDescriptors()) {
			Object value = src.getPropertyValue(pd.getName());
			if (value == null) {
				emptyNames.add(pd.getName());
			}
		}
		
		return emptyNames.toArray(new String[0]);
	}
}
