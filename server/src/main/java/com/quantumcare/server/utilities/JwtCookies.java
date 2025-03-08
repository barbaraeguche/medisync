package com.quantumcare.server.utilities;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

@Component
public class JwtCookies {
	
	public Cookie createCookie(String name, String value) {
		return new Cookie(name, value);
	}
	
	public void setCookieAttr(Cookie cookieAttr, int maxAge) {
		cookieAttr.setPath("/");
		cookieAttr.setSecure(true);
		cookieAttr.setHttpOnly(true);
		cookieAttr.setMaxAge(maxAge);
		cookieAttr.setAttribute("SameSite", "Strict");
	}
}
