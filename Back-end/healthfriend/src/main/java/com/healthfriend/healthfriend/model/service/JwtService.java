package com.healthfriend.healthfriend.model.service;

import java.util.Map;

public interface JwtService {

	<T> String create(String key, T data, String subject);

	Map<String, Object> get(String key);

	String getUserId();

	boolean isUsable(String jwt);

	public void checkValid(String token);

	public int getUserId(String token);
}
