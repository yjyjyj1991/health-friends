package com.healthfriend.healthfriend.model.service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.healthfriend.healthfriend.exception.UnAuthorizedException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class JwtServiceImpl implements JwtService {

	public static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

	private static final String SALT = "ssafySecret";
	private static final int EXPIRE_MINUTES = 60;

	@Override
	public <T> String create(String key, T data, String subject) {
		String jwt = Jwts.builder().setHeaderParam("typ", "JWT").setHeaderParam("regDate", System.currentTimeMillis())
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * EXPIRE_MINUTES))
				.setSubject(subject).claim(key, data).signWith(SignatureAlgorithm.HS256, this.generateKey()).compact();
		return jwt;
	}

	private byte[] generateKey() {
		byte[] key = null;
		try {
			key = SALT.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			if (logger.isInfoEnabled()) {
				e.printStackTrace();
			} else {
				logger.error("Making JWT Key Error ::: {}", e.getMessage());
			}
		}

		return key;
	}

	public void checkValid(String token) {
		Jwts.parser().setSigningKey(SALT.getBytes()).parseClaimsJws(token).toString();
	}

	public boolean isUsable(String jwt) {
		Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);

		try {
			System.out.println(claims.toString());
			String json = "{" + claims.toString() + "}";

			JSONObject jObject;
			try {
				jObject = new JSONObject(json);
				jObject = new JSONObject(jObject.getString("body"));
				jObject.get("UserID").toString(); // 1
			} catch (JSONException e) {
				e.printStackTrace();
			}
		} catch (ExpiredJwtException e) {
			logger.error("Expired JWT token: {}", e.getMessage());
			return false;
		} catch (UnsupportedJwtException e) {
			logger.error("Unsupported JWT token: {}", e.getMessage());
			return false;
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
			return false;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
			return false;
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
			return false;
		}

		return true;
	}

	@Override
	public Map<String, Object> get(String key) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		String jwt = request.getHeader("access-token");
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(jwt);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new UnAuthorizedException();
		}
		Map<String, Object> value = claims.getBody();
		logger.info("value : {}", value);
		return value;
	}

	@Override
	public String getUserId() {
		return (String) this.get("user").get("userid");
	}

	@Override
	public int getUserId(String token) {

		Jws<Claims> claims = Jwts.parser()
				.setSigningKey(this.generateKey())
				.parseClaimsJws(token);

		String json = "{" + claims.toString() + "}";
		JSONObject jObject;
		String userId = "";
		try {
			jObject = new JSONObject(json);
			jObject = new JSONObject(jObject.getString("body"));
			userId = jObject.get("UserID").toString(); // 1
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return Integer.parseInt(userId);
	}

	public Boolean getExpToken(String jwt) {
		try {
			Date expiration = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt)
					.getBody().getExpiration();
			Date now = new Date();

			if (expiration.after(now)) {
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}
}
