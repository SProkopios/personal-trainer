import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
        });
  
      const handleClickOpen = () => {
        console.log("props");
        console.log(props);        
        setTraining({...training, customer: props.customer.links[1].href});
        setOpen(true);
      };
  
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
      setOpen(false);
      }
      };
  
    const handleSave = () => {
      props.addTraining(training);
      console.log("training");
      console.log(training);
      setOpen(false);
      setTraining({
        date: '',
        duration: '',
        activity: '',
        customer: ''
      })
    }
  
    return (
      <div>
        <Button variant="outlined" color='success' onClick={handleClickOpen}>
          New Training
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Training</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="duration"
              value={training.duration}
              onChange={e => setTraining({...training, duration: e.target.value})}
              fullWidth
              variant="standard"
              label="Duration"
            />
            <TextField
              margin="dense"
              name="activity"
              value={training.activity}
              onChange={e => setTraining({...training, activity: e.target.value})}
              fullWidth
              variant="standard"
              label="Activity"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Date"
                  format="DD/MM/YYYY HH:mm"
                  value={training.date}
                  onChange={e => setTraining({...training, date: e.toISOString()})} />
              </DemoContainer>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }