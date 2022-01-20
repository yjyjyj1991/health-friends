package com.healthfriend.healthfriend.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    public Integer id;
    public Integer purpose_id;
    public String email;
    public String name;
    public String nickname;
    public String password;
    public Integer isWithdraw;
    public String withdraw_reason;
    public Double weight;
    public Double activePoint;
}
