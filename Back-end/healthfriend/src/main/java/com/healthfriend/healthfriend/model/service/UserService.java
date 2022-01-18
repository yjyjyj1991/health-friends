package com.healthfriend.healthfriend.model.service;


import com.healthfriend.healthfriend.model.UserDto;

public interface UserService {
    public boolean saveUser(UserDto userDto) throws Exception;
    public boolean ModifyUser(UserDto userDto) throws Exception;
    public boolean ModifyRemoveUser(UserDto userDto) throws Exception;
}
