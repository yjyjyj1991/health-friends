import { Button,TextField,Typography,Grid } from '@mui/material'
import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DietDialog from './DietGoal';


export default function Diet(){
  const [dialog,setDialog]=useState(false)
  function open(){
    setDialog(true)
  }
  function close(){
    setDialog(false)
  }

  return (
    <>
    <Grid container spacing={2} marginY={3}>
      <Grid item xs={9} />
      <Grid item xs={3}>
        <Button variant='contained' onClick={open}>목표설정</Button>
      </Grid>
      <Grid item xs={4} padding={2}>
        <Pie data={data}/>
      </Grid>
      <Grid item xs={4} padding={2}>
        <Pie data={data}/>
      </Grid>
      <Grid item xs={4} padding={2}>
        <Pie data={data}/>
      </Grid>
    </Grid>
    <DietDialog close={close} dialog={dialog}/>
    </>
  )
}

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ['현재','남은 양',],
  datasets: [
    {
      label: '# of Votes',
      data: [20,100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};