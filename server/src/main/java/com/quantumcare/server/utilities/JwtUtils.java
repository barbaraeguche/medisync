package com.quantumcare.server.utilities;

import com.quantumcare.server.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {
	
	@Value("${jwt.validity}")
	private long jwtTokenValidity;
	
	@Value("${jwt.secret}")
	private String secret;
	
	private SecretKey getSignInKey() {
		// use a secure key generation method
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	// retrieve user ID from JWT token
	public String getIdFromToken(String token) {
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
		
		return doGenerateToken(claims, user.get_id().toString());
	}
	
	// generate token with specified claims and subject
	private String doGenerateToken(Map<String, Object> claims, String subject) {
		long timeNow = System.currentTimeMillis();
		
		return Jwts
			.builder()
			.claims(claims)
			.subject(subject)
			.issuedAt(new Date(timeNow))
			.expiration(new Date(timeNow + (jwtTokenValidity * 1000)))
			.signWith(getSignInKey())
			.compact();
	}
}
