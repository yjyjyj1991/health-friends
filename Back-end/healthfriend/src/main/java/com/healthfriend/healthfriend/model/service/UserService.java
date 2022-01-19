package com.healthfriend.healthfriend.model.service;



import com.healthfriend.healthfriend.model.UserDto;

public interface UserService {
    public boolean saveUser(UserDto userDto) throws Exception;
    public boolean modifyUser(UserDto userDto) throws Exception;
    public boolean modifyRemoveUser(UserDto userDto) throws Exception;
    // public boolean findEmail(String email) throws Exception;
    public UserDto findUser(UserDto userDto) throws Exception;
    public UserDto findUserInfo(String email) throws Exception;
}
