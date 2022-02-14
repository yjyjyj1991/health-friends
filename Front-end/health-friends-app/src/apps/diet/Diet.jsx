import { Button,Typography,Grid,Box } from '@mui/material'
import { useState,useEffect,useContext,useCallback } from 'react'
import DietDialog from './DietGoal';
import Calender from 'components/common/Calender';
import axios from 'axios';
import { BASE_URL } from 'common/Properties';
import BasicTable from 'components/common/Table';
import SearchBar from './SearchBar'
import Piechart from './Piechart'

export default function Diet(){
  const userInfo = JSON.parse(localStorage.getItem('user')).userInfo
  const [dialog,setDialog]=useState(false)
  const [date, setDate] = useState(new Date());
  const [list,setList]=useState([])

  useEffect(()=>{
    const data = {
      date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      userId:userInfo.id
    }
    axios.get(BASE_URL+'foodmanagement',{params:data})
    .then(res=>{
      var dailyList=[]
      const dataList = res.data.data
      if (dataList) {
        dataList.forEach(el=>
          {
            const rate=el.newServing/el.servingSize
            dailyList.push({...el,
              kcal:Math.round(el.kcal*rate),
              carbohydrate:Math.round(el.carbohydrate*rate),
              fat:Math.round(el.fat*rate),
              protein:Math.round(el.protein*rate),
            }) 
          }) 
        }
      else {dailyList = []}
      setList(dailyList)
    })
    .catch(err=>console.log(err))
  },[date,userInfo.id])

  const curr = [0,0,0]
  list.forEach(el=>{
    curr[0]+=el.carbohydrate*el.newServing/el.servingSize
    curr[1]+=el.protein*el.newServing/el.servingSize
    curr[2]+=el.fat*el.newServing/el.servingSize
  })
  var cal
  const goal=[0,0,0]
  const LB_WEIGHT = userInfo.weight*2.20462
  switch (userInfo.purposeId) {
    case 1:
      cal = LB_WEIGHT*10*userInfo.activePoint
      goal[0]= cal/2; goal[1]=cal/4; goal[2]=cal/9
      break;
    case 2:
      cal = LB_WEIGHT*10*userInfo.activePoint-300
      goal[1]=LB_WEIGHT*1.1; goal[2]=LB_WEIGHT*0.3; goal[0]=cal-(goal[1]*4+goal[2]*9)/4
      break;
    case 3:
      cal = LB_WEIGHT*10*userInfo.activePoint+200
      goal[1]=LB_WEIGHT*0.9; goal[2]=LB_WEIGHT*0.4; goal[0]=cal-(goal[1]*4+goal[2]*9)/4
      break
    default:
      break;
  }

  function open(){
    setDialog(true)
  }
  function close(){
    setDialog(false)
  }
  function handleDate(date){
    setDate(date)
  }
  function getList(date){
    const data = {
      date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      userId:userInfo.id
    }
    axios.get(BASE_URL+'foodmanagement',{params:data})
    .then(res=>{
      var dailyList=[]
      const dataList = res.data.data
      if (dataList) {
        dataList.forEach(el=>
          {
            const rate=el.newServing/el.servingSize
            dailyList.push({...el,
              kcal:Math.round(el.kcal*rate),
              carbohydrate:Math.round(el.carbohydrate*rate),
              fat:Math.round(el.fat*rate),
              protein:Math.round(el.protein*rate),
            }) 
          }) 
        }
      else {dailyList = []}
      setList(dailyList)
    })
    .catch(err=>console.log(err))
  }
    

  return (
    <>
    <Grid container spacing={2} marginY={3}>
      <Grid item xs={6} marginBottom={5} align='center'>
        <Box sx={{border:1,borderRadius:7,backgroundColor:'yellowgreen'}}>
          {/* <span>현재 활동지수는 {userInfo.activePoint}입니다</span> */}
        <Typography variant='h5'>현재 활동지수는 {userInfo.activePoint}입니다</Typography>
        <Typography variant='h5'>현재 몸무게는 {userInfo.weight}입니다</Typography>
        <Typography variant='h5'>현재 목표는 {userInfo.purpose}입니다</Typography>
        <Button variant='contained' onClick={open}>수정하기</Button>
        </Box>
      </Grid>

      <Grid item xs={6} align='center'> 
        <Calender setDate={handleDate} date={date} />
      </Grid>

      <Grid item xs={12}>
        <SearchBar setList={setList} list={list} />
      </Grid>
      
      <Grid item xs={12} align='center'>
        <BasicTable list={list} setList={setList} />
      </Grid>
      
      <Grid item container xs={12} marginBottom={10}>
        <Grid item xs={4} padding={2}>
          <Typography variant='h5' align='center'>탄수화물</Typography>
          <Piechart goal={goal[0]} current={curr[0]}/>
        </Grid>

        <Grid item xs={4} padding={2}>
          <Typography variant='h5' align='center'>단백질</Typography>
          <Piechart goal={goal[1]} current={curr[1]}/>
        </Grid>

        <Grid item xs={4} padding={2}>
          <Typography variant='h5' align='center'>지방</Typography>
          <Piechart goal={goal[2]} current={curr[2]}/>
        </Grid>
      </Grid>
    
    </Grid>
    <DietDialog close={close} dialog={dialog} />
    </>
  )
}


//  <Piechart carbo goal current />
//  <Piechart protein goal current />
//  <Piechart fat goal current />

 
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
  