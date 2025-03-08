package com.quantumcare.server.utilities;

import com.quantumcare.server.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {
	
	// token validity in milliseconds (1 hour)
	private static final long JWT_TOKEN_VALIDITY = 3600 * 1000;
	
//	@Value("${JWT_SECRET}") //todo: name jwt secret key this
	private final String secret = Jwts.SIG.HS256.key().toString();
	
	private SecretKey getSignInKey() {
		// use a secure key generation method
		return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	}
	
	// retrieve email from JWT token
	public String getEmailFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
  }
	
	// Retrieve expiration date from JWT token
	public Date getExpDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	// extract a specific claim from token
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	// for retrieving any information from the token, we will need the secret key
	public Claims getAllClaimsFromToken(String token) {
		return Jwts
			.parser()
			.verifyWith(getSignInKey())
			.build()
			.parseSignedClaims(token)
			.getPayload();
	}
	
	// check if the token has expired
	private boolean isTokenExpired(String token) {
		final Date expiration = getExpDateFromToken(token);
		return expiration.before(new Date());
	}
	// validate token
	public boolean validateToken(String token) {
		try {
			return !isTokenExpired(token);
		} catch (Exception e) {
			return false;
		}
  }
	
	// generate token for user
	public String generateToken(User user) {
		Map<String, Object> claims = Map.of(
			"id", user.get_id(),
			"role", user.getRole()
		);
		
		return doGenerateToken(claims, user.getEmail());
	}
	
	// generate token with specified claims and subject
	private String doGenerateToken(Map<String, Object> claims, String subject) {
		long timeNow = System.currentTimeMillis();
		
		return Jwts
			.builder()
			.claims(claims)
			.subject(subject)
			.issuedAt(new Date(timeNow))
			.expiration(new Date(timeNow + JWT_TOKEN_VALIDITY))
			.signWith(getSignInKey())
			.compact();
	}
}
