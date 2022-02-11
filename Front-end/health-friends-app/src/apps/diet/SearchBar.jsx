import {FormControlLabel,InputAdornment, TextField, Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';

export default function SearchBar(){

  return (
  <>
    <FormControlLabel control={<Checkbox />} label="브랜드로 검색하기" />
    <TextField
      required
      label="음식 또는 브랜드"
      name='food'
      fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <Button variant='contained' type='submit'>검색</Button>
          </InputAdornment>
    }}
    />
  </>
  )
}

