package com.healthfriend.healthfriend.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    public Integer id;
    public Integer purposeId;
    public String email;
    public String name;
    public String nickname;
    public String password;
    public Integer isWithdraw;
    public String withdrawReason;
    public Double weight;
    public Double activePoint;
}
