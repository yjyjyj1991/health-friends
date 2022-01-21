package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;

import com.healthfriend.healthfriend.model.DTO.user.*;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    public int insertUser(UserSignup userSignup) throws SQLException;

    public int updateUser(UserModifyRequest userModifyRequest) throws SQLException;

    public int updateDUser(UserWithdraw userWithdraw) throws SQLException;

    public int updateUserPassword(UserAccountRequest userAccountRequest) throws SQLException;

    public boolean isExistsEmail(String email) throws SQLException;

    public boolean isExistsNickname(String nickname) throws SQLException;

    public UserResponse selectUser(UserAccountRequest userAccountRequest) throws SQLException;

    public UserDto selectUserInfo(String email) throws SQLException;
}
