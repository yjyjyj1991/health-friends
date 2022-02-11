import { Button,Typography,Grid, } from '@mui/material'
import { useState,useEffect,useContext } from 'react'
import DietDialog from './DietGoal';
import Calender from 'components/common/Calender';
import axios from 'axios';
import { BASE_URL } from 'common/Properties';
import BasicTable from 'components/common/Table';
import SearchBar from './SearchBar'

export default function Diet(){
  console.log('diet render');
  const userInfo = JSON.parse(localStorage.getItem('user')).userInfo
  const [dialog,setDialog]=useState(false)
  const [date, setDate] = useState(new Date());
  const [list,setList]=useState(
    [
    {
      "id": 21,
      "foodName": "채소 초밥",
      "carbohydrate": 88,
      "protein": 8,
      "brand": "삼삼한밥상(Ⅶ)",
      "fat": 1,
      "kcal": 393,
      "newServing": 100,
      "servingSize": 280
    },
    {
      "id": 22,
      "foodName": "채소 초밥",
      "carbohydrate": 88,
      "protein": 8,
      "brand": "삼삼한밥상(Ⅶ)",
      "fat": 1,
      "kcal": 393,
      "newServing": 100,
      "servingSize": 280
    },
    {
      "id": 23,
      "foodName": "닭가슴살샐러드",
      "carbohydrate": 8,
      "protein": 11,
      "brand": "전국(대표)",
      "fat": 14,
      "kcal": 203,
      "newServing": 111,
      "servingSize": 150
    },
    {
      "id": 25,
      "foodName": "슈팅스타",
      "carbohydrate": 0,
      "protein": 5,
      "brand": "비알코리아(주)배스킨라빈스",
      "fat": 0,
      "kcal": 253,
      "newServing": 111,
      "servingSize": 115
    },
    {
      "id": 26,
      "foodName": "날치알김밥",
      "carbohydrate": 75,
      "protein": 16,
      "brand": "전국(대표)",
      "fat": 11,
      "kcal": 461,
      "newServing": 111,
      "servingSize": 260
    }
  ])
  function open(){
    setDialog(true)
  }
  function close(){
    setDialog(false)
  }
  function handleDate(date){
    setDate(date)
    const data = {date:`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`, userId:userInfo.id}
    axios.get(BASE_URL+'foodmanagement',{params:data})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  

  return (
    <>
    <Grid container spacing={2} marginY={3}>
      <Grid item xs={6} marginBottom={5} align='center'>
        <Typography variant='h5'>현재 활동지수는 {userInfo.activePoint}입니다</Typography>
        <Typography variant='h5'>현재 몸무게는 {userInfo.weight}입니다</Typography>
        <Typography variant='h5'>현재 목표는 {userInfo.purpose}입니다</Typography>
        <Button variant='contained' onClick={open}>수정하기</Button>
      </Grid>

      <Grid item xs={6} align='center' > 
        <Calender setDate={handleDate} date={date} />
      </Grid>

      <Grid item xs={12}>
        <SearchBar setList={setList}/>
      </Grid>
      
      <Grid item xs={12} align='center'>
        <BasicTable list={list} setList={setList} />
      </Grid>
      
      <Grid item xs={4} padding={8}>
        <Typography variant='h5' align='center'>탄수화물</Typography>
      </Grid>

      <Grid item xs={4} padding={8}>
        <Typography variant='h5' align='center'>단백질</Typography>
      </Grid>

      <Grid item xs={4} padding={8}>
        <Typography variant='h5' align='center'>지방</Typography>
      </Grid>

    </Grid>
    <DietDialog close={close} dialog={dialog} />
    </>
  )
}



 
// 다이어트 할때 계산 방법
// 단백질 : 몸무게 (파운드 값) * 1.1
// 지방 : 몸무게 (파운드 값) * 0.3
// 탄수화물 : (칼로리 - (단백질 *4 + 지방 * 9))/4 

// 린메스업 할 때 계산 방법
// 단백질 : 몸무게 (파운드 값) * 0.9
// 지방 : 몸무게 (파운드 값) * 0.4
// 탄수화물 : (칼로리 - (단백질 *4 + 지방 * 9))/4 

// 유지 할때는
// 탄수화물: (칼로리 총량의 50%) 
// 단백질 : (칼로리 총량의 25%) 
// 지방 : ((칼로리 총량의 * 0.25) * (4/9))

// 유지 칼로리 구하는 법 : (몸무게(파운드 값으로) * 10 ) *(Active_Point DB에서 받아온 값(1.3~1.8))
// 다이어트 칼로리 구하는 법 : (몸무게(파운드 값으로) * 10 ) *(Active_Point DB에서 받아온 값(1.3~1.8)) - 300
// 린 메스업 칼로리 구하는 법 : (몸무게(파운드 값으로) * 10 ) *(Active_Point DB에서 받아온 값(1.3~1.8)) + 200
  