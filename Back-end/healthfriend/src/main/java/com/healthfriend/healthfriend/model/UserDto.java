package com.healthfriend.healthfriend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    public int id;
    public int purpose_id;
    public String email;
    public String name;
    public String nickname;
    public String password;
    public int isWithdraw;
    public String withdraw_reason;
    public double weight;
    public double active_point;
}
