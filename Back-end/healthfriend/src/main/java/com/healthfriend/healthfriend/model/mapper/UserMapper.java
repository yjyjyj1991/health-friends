package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;

import com.healthfriend.healthfriend.model.UserDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    public int insertUser(UserDto userDto) throws SQLException;

    public int updateUser(UserDto userDto) throws SQLException;

    public int updateDUser(UserDto userDto) throws SQLException;

    public int updateUserPassword(UserDto userDto) throws SQLException;

    public boolean isExistsEmail(String email) throws SQLException;

    public boolean isExistsNickname(String nickname) throws SQLException;
}
