package com.healthfriend.healthfriend.model.service;

import com.healthfriend.healthfriend.model.DTO.user.UserModifyRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserPasswordChangeRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserAccountRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserResponse;
import com.healthfriend.healthfriend.model.DTO.user.UserSignup;
import com.healthfriend.healthfriend.model.DTO.user.UserTokenDto;
import com.healthfriend.healthfriend.model.DTO.user.UserWithdraw;
import com.healthfriend.healthfriend.model.mapper.UserMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public boolean saveUser(UserSignup userSignup) throws Exception {
    return sqlSession.getMapper(UserMapper.class).insertUser(userSignup) == 1;
  }

  @Override
  public boolean modifyUser(UserModifyRequest userModifyRequest) throws Exception {
    return sqlSession.getMapper(UserMapper.class).updateUser(userModifyRequest) == 1;
  }

  @Override
  public boolean deleteUser(UserWithdraw userWithdraw) throws Exception {
    return sqlSession.getMapper(UserMapper.class).updateDUser(userWithdraw) == 1;
  }

  @Override
  public UserResponse findUser(UserAccountRequest userRequest) throws Exception {
    if (userRequest.getEmail() == null || userRequest.getPassword() == null)
      return null;
    return sqlSession.getMapper(UserMapper.class).selectUser(userRequest);
  }

  @Override
  public UserResponse findUserInfo(String email) throws Exception {
    return sqlSession.getMapper(UserMapper.class).selectUserInfo(email);
  }

  @Override
  public boolean updateUserRandomPassword(UserAccountRequest userAccountRequest) throws Exception {
    return sqlSession.getMapper(UserMapper.class).updateUserRandomPassword(userAccountRequest) == 1;
  }

  @Override
  public boolean isExistsEmail(String email) throws Exception {
    return sqlSession.getMapper(UserMapper.class).isExistsEmail(email);
  }

  @Override
  public boolean isExistsNickname(String nickname) throws Exception {
    return sqlSession.getMapper(UserMapper.class).isExistsNickname(nickname);
  }

  @Override
  public boolean modifyLogin(UserTokenDto userTokenDto) throws Exception {
    return sqlSession.getMapper(UserMapper.class).updateLogin(userTokenDto) == 1;
  }

  @Override
  public UserResponse findUserById(UserPasswordChangeRequest passwordChangeRequest) throws Exception {
    return sqlSession.getMapper(UserMapper.class).selectUserByIdAndPassword(passwordChangeRequest);
  }

  @Override
  public boolean updateUserPassword(UserPasswordChangeRequest passwordChangeRequest) throws Exception {
    return sqlSession.getMapper(UserMapper.class).updateUserPassword(passwordChangeRequest) == 1;
  }

  @Override
  public UserResponse findUserById(int id) throws Exception {
    return sqlSession.getMapper(UserMapper.class).selectUserById(id);
  }
}
