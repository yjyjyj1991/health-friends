package com.healthfriend.healthfriend.model.service;

import com.healthfriend.healthfriend.model.UserDto;
import com.healthfriend.healthfriend.model.mapper.UserMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public boolean saveUser(UserDto userDto) throws Exception {
        return sqlSession.getMapper(UserMapper.class).insertUser(userDto) == 1;
    }

    @Override
    public boolean modifyUser(UserDto userDto) throws Exception {
        if (userDto.getPassword() == null) {
            throw new Exception();
        }
        return sqlSession.getMapper(UserMapper.class).updateUser(userDto) == 1;
    }

    @Override
    public boolean deleteUser(UserDto userDto) throws Exception {
        return sqlSession.getMapper(UserMapper.class).updateDUser(userDto) == 1;
    }

    @Override
    public boolean updateUserPassword(UserDto userDto) throws Exception {
        return sqlSession.getMapper(UserMapper.class).updateUserPassword(userDto) == 1;
    }

    @Override
    public boolean isExistsEmail(String email) throws Exception {
        return sqlSession.getMapper(UserMapper.class).isExistsEmail(email);
    }

    @Override
    public boolean isExistsNickname(String nickname) throws Exception {
        return sqlSession.getMapper(UserMapper.class).isExistsNickname(nickname);
    }
}
