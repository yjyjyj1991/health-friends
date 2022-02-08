import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import ChangePwForm from '../account/form/ChangePwForm';
import LoginForm from '../account/form/LoginForm'
import SignupForm from '../account/form/SignupForm';
import ResetForm from '../account/form/ResetForm'

export default function FormDialog(props) {
  
  const {dialog,setDialog}=props

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  function forgotPw(){
    setDialog('reset')
  }

  return (
    <div>
      <Dialog open={Boolean(dialog)} onClose={handleClose}>
        {dialog==='changePw' && <ChangePwForm setDialog={setDialog}/> }
        {dialog==='login' && <LoginForm setDialog={setDialog}/>}
        {dialog==='signup' && <SignupForm setDialog={setDialog}/>}
        {dialog==='reset' && <ResetForm setDialog={setDialog}/>}
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          {dialog==='login'&&<Button onClick={forgotPw}>비밀번호를 잊어버렸나요?</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
