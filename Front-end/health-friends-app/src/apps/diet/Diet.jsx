import Dialog from '../../components/common/Dialog'
import { Button,TextField,Typography,Grid } from '@mui/material'
import { useState } from 'react'

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
    <Grid container spacing={2}>
      <Grid item xs={9} />
      <Grid item xs={3}>
        <Button variant='contained' onClick={open}>목표설정</Button>
      </Grid>
      <Grid item>
        
      </Grid>
      <Grid item>
        
      </Grid>
    </Grid>
    <Dialog close={close} dialog={dialog}/>
    </>
  )
}