package com.healthfriend.healthfriend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    public int id;
    public int purposeId;
    public String email;
    public String name;
    public String nickname;
    public String password;
    public int isWithdraw;
    public String withdrawReason;
    public double weight;
    public double activePoint;
}
