import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './form/LoginForm';
import SignupForm from './form/SignupForm'
import ResetForm from './form/ResetForm'

export default function FormDialog(props) {
  const {dialog, setDialog} = props

  const handleClose = () => {
    setDialog(false);
  };

  return (
    <Dialog maxWidth='xs' fullWidth open={Boolean(dialog)} >
      <Box marginBottom={5}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size='large'
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 48,
            height: 48,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>      
      {dialog==='login'&&<LoginForm setDialog={setDialog} />}
      {dialog==='signup'&&<SignupForm setDialog={setDialog}/>}
      {dialog==='reset'&&<ResetForm setDialog={setDialog}/>}
    </Dialog>
  );
}
