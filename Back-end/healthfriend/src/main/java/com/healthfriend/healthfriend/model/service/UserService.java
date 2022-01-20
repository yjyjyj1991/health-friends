package com.healthfriend.healthfriend.model.service;

import com.healthfriend.healthfriend.model.DTO.UserDto;

public interface UserService {
    public boolean saveUser(UserDto userDto) throws Exception;

    public boolean modifyUser(UserDto userDto) throws Exception;

    public boolean deleteUser(UserDto userDto) throws Exception;

    public boolean updateUserPassword(UserDto userDto) throws Exception;

    public boolean isExistsEmail(String email) throws Exception;

    public boolean isExistsNickname(String nickname) throws Exception;

    // public boolean findEmail(String email) throws Exception;
    public UserDto findUser(UserDto userDto) throws Exception;

    public UserDto findUserInfo(String email) throws Exception;
}
