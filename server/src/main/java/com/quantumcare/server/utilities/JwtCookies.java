package com.quantumcare.server.utilities;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public final class JwtCookies {
	
	private static int jwtTokenValidity = 0;
	
	private JwtCookies(@Value("${jwt.validity}") int configuredValidity) {
		jwtTokenValidity = configuredValidity;
	}
	
	public static Cookie createCookie(String name, String value) {
		return new Cookie(name, value);
	}
	
	public static void setCookieAttr(Cookie cookieAttr, Integer maxAge) {
		cookieAttr.setPath("/");
		cookieAttr.setSecure(true);
		cookieAttr.setHttpOnly(true);
		cookieAttr.setMaxAge(maxAge == null ? jwtTokenValidity : maxAge);
//		cookieAttr.setAttribute("SameSite", "None");
		cookieAttr.setAttribute("SameSite", "Strict");
	}
}
