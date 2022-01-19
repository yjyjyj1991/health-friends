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
        if(userDto.getPassword() == null) {
			throw new Exception();
		}
        return sqlSession.getMapper(UserMapper.class).updateUser(userDto) == 1;
    }

    @Override
    public boolean modifyRemoveUser(UserDto userDto) throws Exception {
        return sqlSession.getMapper(UserMapper.class).updateDUser(userDto) == 1;
    }

    // @Override
    // public boolean findEmail(String email) throws Exception {
    //     return sqlSession.getMapper(UserMapper.class).selectUser(email) == 1;
    // }

    @Override
    public UserDto findUser(UserDto userDto) throws Exception {
		if(userDto.getEmail() == null || userDto.getPassword() == null)
			return null;
		return sqlSession.getMapper(UserMapper.class).selectUser(userDto);
    }

    @Override
    public UserDto findUserInfo(String email) throws Exception {
		return sqlSession.getMapper(UserMapper.class).selectUserInfo(email);
    }

}

