package com.healthfriend.healthfriend.model.DTO.Food;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "FoodParameterDto : 음식 파라미터 정보", description = "음식의 정보를 얻기위한 부가적인 파라미터정보.")
public class FoodParameterDto {

	@ApiModelProperty(value = "현재 페이지 번호", example = "1")
	private int pg;
	@ApiModelProperty(value = "페이지당 음식 노출 갯수", example = "20")
	private int spp;
	@ApiModelProperty(value = "페이지의 시작 음식 번호", example = "1")
	private int start;
	@ApiModelProperty(value = "검색 조건 -> food_name 또는 brand 만 가능하다")
	private String key;
	@ApiModelProperty(value = "검색어")
	private String word;

	public FoodParameterDto() {
		pg = 1;
		spp = 20;
	}

	public int getPg() {
		return pg;
	}

	public void setPg(int pg) {
		pg = pg == 0 ? 1 : pg;
		this.pg = pg;
	}

	public int getSpp() {
		return spp;
	}

	public void setSpp(int spp) {
		this.spp = spp;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

}
