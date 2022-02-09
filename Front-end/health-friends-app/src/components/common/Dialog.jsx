import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DietGoal from 'apps/diet/DietGoal';

export default function FormDialog(props) {


  const handleClose = () => {
    props.close();
  };

  return (
    <div>
      <Dialog open={props.dialog} onClose={handleClose}>
        <DietGoal />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
