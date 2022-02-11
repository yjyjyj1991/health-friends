import { Button,Typography,Grid, } from '@mui/material'
import { useState,useEffect,useContext } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DietDialog from './DietGoal';
import Calender from 'components/common/Calender';
import axios from 'axios';
import { BASE_URL } from 'common/Properties';
import BasicTable from 'components/common/Table';

export default function Diet(){
  const userInfo = JSON.parse(localStorage.getItem('user')).userInfo
  const [dialog,setDialog]=useState(false)
  const [date, setDate] = useState(new Date());
  const [list,setList]=useState([])
  const [checked, setChecked] = useState(false);
  function open(){
    setDialog(true)
  }
  function close(){
    setDialog(false)
  }
  function handleDate(date){
    setDate(date)
    axios.get(BASE_URL+'foodmanagement',{date:date,userId:userInfo.userId})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  const handleCheckChange = (event) => {
    setChecked(event.target.checked)
  };


  const WEIGHT = userInfo.weight*2.20462
  const BASE_CAL = WEIGHT*10*userInfo.activePoint
  var cal,protein,fat,carbo
  switch (userInfo.purposeId) {
    case 1:
      cal = BASE_CAL
      protein = cal*0.25
      fat = cal*0.25*4/9
      carbo= cal*0.5
      break;
    case 2:
      cal = BASE_CAL-300
      protein=WEIGHT*1.1
      fat=WEIGHT*0.3
      carbo=cal-(protein*4+fat*9)/4
      break;
    case 3:
      cal = BASE_CAL+200
      protein=WEIGHT*0.9
      fat = WEIGHT*0.4
      carbo=cal-(protein*4+fat*9)/4
      break
    default:
      break;
  }
  const data = [{
  labels: ['현재','남은 양',],
  datasets: [
    {
      label: '# of Votes',
      data: [20,carbo],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
  },
  {
  labels: ['현재','남은 양',],
  datasets: [
    {
      label: '# of Votes',
      data: [20,protein],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
  },
  {
  labels: ['현재','남은 양',],
  datasets: [
    {
      label: '# of Votes',
      data: [20,fat],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
  },
  ]
  const options = [
  {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '탄수화물',
      },
    },
  },
  {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '단백질',
      },
    },
  },
  {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '지방',
      },
    },
  },
]
  

  return (
    <>
    <Grid container spacing={2} marginY={3}>

      <Grid item xs={6} marginBottom={5} align='center' borderColor='primary'>
        <Typography variant='h5'>현재 활동지수는 {userInfo.activePoint}입니다</Typography>
        <Typography variant='h5'>현재 몸무게는 {userInfo.weight}입니다</Typography>
        <Typography variant='h5'>현재 목표는 {userInfo.purpose}입니다</Typography>
        <Button variant='contained' onClick={open}>수정하기</Button>
      </Grid>

      <Grid item xs={6} align='center'>
        <Calender setDate={handleDate} date={date}/>
      </Grid>

      <Grid item xs={12}>
        
      </Grid>

      <Grid item xs={12} align='center'>
        <BasicTable />
      </Grid>
      
      <Grid item xs={12} align='center'>
        <BasicTable />
      </Grid>

      <Grid item xs={12} padding={8}>
      </Grid>
      
      <Grid item xs={4} padding={8}>
        <Typography variant='h5' align='center'>탄수화물</Typography>
        <Pie data={data[0]}/>
      </Grid>

      <Grid item xs={4} padding={8}>
        <Typography variant='h5' align='center'>단백질</Typography>
        <Pie data={data[1]}/>
      </Grid>

      <Grid item xs={4} padding={8}>
        <Typography variant='h5' align='center'>지방</Typography>
        <Pie data={data[2]}/>
      </Grid>

    </Grid>
    <DietDialog close={close} dialog={dialog} />
    </>
  )
}

ChartJS.register(ArcElement, Tooltip, Legend);


 
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
  