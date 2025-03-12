package com.quantumcare.server.utilities;

import jakarta.servlet.http.Cookie;

public final class JwtCookies {
	private JwtCookies() {}
	
	public static Cookie createCookie(String name, String value) {
		return new Cookie(name, value);
	}
	
	public static void setCookieAttr(Cookie cookieAttr, int maxAge) {
		cookieAttr.setPath("/");
		cookieAttr.setSecure(true);
		cookieAttr.setHttpOnly(true);
		cookieAttr.setMaxAge(maxAge);
		cookieAttr.setAttribute("SameSite", "Strict");
	}
}
