import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../account/form/LoginForm';
import SignupForm from '../account/form/SignupForm'
import ResetForm from '../account/form/ResetForm'
import ChangePwForm from '../account/form/ChangePwForm';
import DietGoal from '../../apps/diet/DietGoal';

export default function FormDialog(props) {
  const {dialog, setDialog} = props
  const navigate=useNavigate()
  const handleClose = () => {
    if (dialog==='login') {navigate('/')}
    setDialog(false);
  };

  return (
    <Dialog fullWidth open={Boolean(dialog)} >
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
      {dialog==='changePw'&&<ChangePwForm setDialog={setDialog}/>}
      {dialog==='dietGoal'&&<DietGoal setDialog={setDialog}/>}
    </Dialog>
  );
}
