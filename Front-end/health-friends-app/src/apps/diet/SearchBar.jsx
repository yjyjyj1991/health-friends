import {FormControlLabel,InputAdornment, TextField, Button,Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import SearchResult from './SearchResult'
import { useState } from 'react';
import axios from 'axios';

const BASE_URL='https://i6d204.p.ssafy.io/api/'

export default function SearchBar(props){
  console.log('searchBar render');
  const [checked, setChecked] = useState(false);
  const [result,setResult]=useState([])
  const label = checked?'브랜드검색':'음식검색'
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  function search(e){
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const data1 = {
      key:checked?'brand':'food_name',
      spp:1000,
      word:data.get('word')
    }
    console.log(data1);
    axios.get(BASE_URL+'foods', {params:data1} )
    .then(res=>setResult(res.data.data))
    .catch(err=>console.log(err))
  }

  return (
  <Box margin={2}>
    <FormControlLabel 
      control={<Checkbox checked={checked} onChange={handleChange}/>} 
      label={label} />
    <TextField
      component='form'
      onSubmit={search}
      required
      label="음식 또는 브랜드"
      name='word'
      fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <Button variant='contained' type='submit'>검색</Button>
          </InputAdornment>
    }}
    />
    {result.length>0 && <SearchResult result={result} setList={props.setList}/>}
  </Box>
  )
}

