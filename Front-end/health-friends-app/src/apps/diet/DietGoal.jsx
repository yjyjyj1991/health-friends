import { Grid,TextField,Typography,Button } from "@mui/material"

export default function DietGoal(){
  function handleChange(){

  }
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item display='flex' justifyContent='center' xs={12}>
        <Typography fontSize='large'>몸무게를 입력하면 적정량을 알려드립니다</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField 
        size="small"
        required
        onChange={handleChange}
        label="키"
        name='height'
        fullWidth/>
      </Grid>
      <Grid item xs={6}>
        <TextField 
        required
        onChange={handleChange}
        label="몸무게"
        name='weight'
        fullWidth/>
      </Grid>
    </Grid>
  )
}