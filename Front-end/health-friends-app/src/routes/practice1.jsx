import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function FormPropsTextFields() {
  return (
    <Grid container spacing={2} direction='row'>
      <Grid item xs={8}>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      </Grid>

      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      </Grid>
    </Grid>
  );
}