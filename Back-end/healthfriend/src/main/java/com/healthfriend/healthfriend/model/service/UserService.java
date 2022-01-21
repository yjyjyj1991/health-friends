package com.healthfriend.healthfriend.model.service;

import com.healthfriend.healthfriend.model.DTO.user.UserDto;
import com.healthfriend.healthfriend.model.DTO.user.UserModifyRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserAccountRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserResponse;
import com.healthfriend.healthfriend.model.DTO.user.UserSignup;
import com.healthfriend.healthfriend.model.DTO.user.UserWithdraw;

public interface UserService {
    public boolean saveUser(UserSignup userDto) throws Exception;

    public boolean modifyUser(UserModifyRequest userModifyRequest) throws Exception;

    public boolean deleteUser(UserWithdraw userWithdraw) throws Exception;

    public boolean updateUserPassword(UserAccountRequest userAccountRequest) throws Exception;

    public boolean isExistsEmail(String email) throws Exception;

    public boolean isExistsNickname(String nickname) throws Exception;

    // public boolean findEmail(String email) throws Exception;
    public UserResponse findUser(UserAccountRequest userDto) throws Exception;

    public UserDto findUserInfo(String email) throws Exception;
}
