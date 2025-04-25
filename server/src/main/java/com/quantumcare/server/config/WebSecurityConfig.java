package com.quantumcare.server.config;

import com.quantumcare.server.security.JwtAuthorizationFilter;
import com.quantumcare.server.services.UserService;
import com.quantumcare.server.utilities.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
	
	@Value("${frontend.url}")
	private String frontendUrl;
	
	private final JwtUtils jwtUtils;
	
	@Autowired
	public WebSecurityConfig(JwtUtils jwtUtils) {
		this.jwtUtils = jwtUtils;
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, UserService userService) throws Exception {
		httpSecurity
			.csrf(AbstractHttpConfigurer::disable)
			.cors((cors) -> cors.configurationSource(corsConfigurationSource()))
			.sessionManagement((session) -> session.sessionCreationPolicy(
				SessionCreationPolicy.STATELESS
			))
			.authorizeHttpRequests((requests) ->
				requests
					.requestMatchers("/").permitAll()
					// auth endpoints
					.requestMatchers("/api/auth/**").permitAll()
					.requestMatchers("/error").permitAll()
					
					// user endpoints
					.requestMatchers("/api/users/**").hasAnyAuthority("Admin", "Doctor", "Patient")
					
					// get all doctors to book appointment
					.requestMatchers(HttpMethod.GET, "/api/doctors").permitAll()
					// all other doctors endpoints
					.requestMatchers("/api/doctors/**").hasAnyAuthority("Admin", "Doctor")
					
					// patient endpoints
					.requestMatchers("/api/patients/**").hasAnyAuthority("Admin", "Patient")
					
					// all other requests need authentication
					.anyRequest().authenticated()
			)
			.addFilterBefore(
				new JwtAuthorizationFilter(jwtUtils, userService), UsernamePasswordAuthenticationFilter.class
			);
		
		return httpSecurity.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		
		corsConfiguration.setAllowedOrigins(List.of(frontendUrl, "http://localhost:5173/")); //todo: vercel frontend to be loaded from environment
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setMaxAge(3600L);
		
		UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
		corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return corsConfigurationSource;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
