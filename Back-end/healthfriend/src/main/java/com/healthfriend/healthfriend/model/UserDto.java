package com.healthfriend.healthfriend.model;

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

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPurpose_id() {
        return this.purpose_id;
    }

    public void setPurpose_id(int purpose_id) {
        this.purpose_id = purpose_id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getIsWithdraw() {
        return this.isWithdraw;
    }

    public void setIsWithdraw(int isWithdraw) {
        this.isWithdraw = isWithdraw;
    }

    public String getWithdraw_reason() {
        return this.withdraw_reason;
    }

    public void setWithdraw_reason(String withdraw_reason) {
        this.withdraw_reason = withdraw_reason;
    }

    public double getWeight() {
        return this.weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getActive_point() {
        return this.active_point;
    }

    public void setActive_point(double active_point) {
        this.active_point = active_point;
    }

}
