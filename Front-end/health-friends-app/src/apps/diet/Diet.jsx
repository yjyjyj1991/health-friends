import { Button,Typography,Grid,Box } from '@mui/material'
import { useState,useEffect,useContext, } from 'react'
import DietDialog from './DietGoal';
import Calender from 'components/common/Calender';
// import axios from 'axios';
// import { BASE_URL } from 'common/Properties';
import BasicTable from 'components/common/Table';
import SearchBar from './SearchBar'
import Piechart from './Piechart'
import AppBar from '../../components/appbar/AppBar';
import Footer from '../../components/Footer/Footer';

export default function Diet(){
  const userInfo = JSON.parse(localStorage.getItem('user')).userInfo
  const [dialog,setDialog]=useState(false)
  const [list,setList]=useState([])


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
  // function getList(){
  //   console.log('getlist')
  //   const data = {
  //     date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
  //     userId:userInfo.id
  //   }
  //   axios.get(BASE_URL+'foodmanagement',{params:data})
  //   .then(res=>{
  //     var dailyList=[]
  //     const dataList = res.data.data
  //     if (dataList) {
  //       dataList.forEach(el=>
  //         {
  //           const rate=el.newServing/el.servingSize
  //           dailyList.push({...el,
  //             kcal:Math.round(el.kcal*rate),
  //             carbohydrate:Math.round(el.carbohydrate*rate),
  //             fat:Math.round(el.fat*rate),
  //             protein:Math.round(el.protein*rate),
  //           }) 
  //         }) 
  //       }
  //     else {dailyList = []}
  //     setList(dailyList)
  //   })
  //   .catch(err=>console.log(err))
  // }


  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
      <AppBar dialog={dialog} setDialog={setDialog} />
      <div className='container' 
        // style={{flex:'1'}}
      >
        <Grid container spacing={2} marginY={3}>
          <Grid item xs={4} marginBottom={5} align='center' >
            <Box sx={{border:1,borderRadius:1,backgroundColor:'lightgreen' }} paddingY={5}>
              <Typography variant='h5'>현재 활동지수는 {userInfo.activePoint}입니다</Typography>
              <Typography variant='h5'>현재 몸무게는 {userInfo.weight}입니다</Typography>
              {userInfo.purposeId===1&&<Typography variant='h5'>현재 목표는 유지입니다</Typography>}
              {userInfo.purposeId===2&&<Typography variant='h5'>현재 목표는 다이어트입니다</Typography>}
              {userInfo.purposeId===3&&<Typography variant='h5'>현재 목표는 린매스업입니다</Typography>}
              <Button variant='contained' onClick={open} size='small'>수정하기</Button>
            </Box>
          </Grid>

          <Grid item xs={6} align='center' > 
            <Calender id={userInfo.id} list={list} setList={setList} />
          </Grid>

          <Grid item xs={12} sx={{border:1,borderRadius:1, }} align='center'>
            <Typography variant='h3'>오늘의 식단 추가</Typography>
            <SearchBar setList={setList} list={list} />
          </Grid>
          
          <Grid item xs={12} align='center' marginBottom={5}>
            <BasicTable list={list} setList={setList} />
          </Grid>
          
          <Grid item container xs={12} marginBottom={10}>
            <Grid item xs={4} padding={6}>
              <Typography variant='h5' align='center'>탄수화물</Typography>
              <Piechart goal={goal[0]} current={curr[0]}/>
            </Grid>

            <Grid item xs={4} padding={6}>
              <Typography variant='h5' align='center'>단백질</Typography>
              <Piechart goal={goal[1]} current={curr[1]}/>
            </Grid>

            <Grid item xs={4} padding={6}>
              <Typography variant='h5' align='center'>지방</Typography>
              <Piechart goal={goal[2]} current={curr[2]}/>
            </Grid>
          </Grid>
        
        </Grid>
        <DietDialog close={close} dialog={dialog} />

      </div>
      <Footer/>
    </div>
  )
}