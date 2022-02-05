import Dialog from '../../components/common/Dialog'
import { Button,TextField,Typography,Grid } from '@mui/material'

export default function Diet(props){
  const {setDialog} = props
  function openDialog(){
    setDialog('dietGoal')
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9} />
      <Grid item xs={3}>
        <Button variant='contained' onClick={openDialog}>목표설정</Button>
      </Grid>
      <Grid item>
        
      </Grid>
      <Grid item>
        
      </Grid>
    </Grid>
  )
}