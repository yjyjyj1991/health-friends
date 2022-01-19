package com.healthfriend.healthfriend.model.service;

import com.healthfriend.healthfriend.model.UserDto;

public interface UserService {
    public boolean saveUser(UserDto userDto) throws Exception;

    public boolean modifyUser(UserDto userDto) throws Exception;

    public boolean deleteUser(UserDto userDto) throws Exception;

    public boolean updateUserPassword(UserDto userDto) throws Exception;

    public boolean isExistsEmail(String email) throws Exception;

    public boolean isExistsNickname(String nickname) throws Exception;
}
