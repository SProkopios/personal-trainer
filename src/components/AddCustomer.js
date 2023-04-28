import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
    });
  

    const handleClickOpen = () => {
    setOpen(true);
    };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
    setOpen(false);
    }
    };

  const handleSave = () => {
    props.addCustomer(customer);
    setOpen(false);
    setCustomer({
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: ''
    })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
            fullWidth
            variant="standard"
            label="Firstname"
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
            fullWidth
            variant="standard"
            label="Lastname"
          />
          <TextField
            margin="dense"
            name="streetadress"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
            fullWidth
            variant="standard"
            label="Street adress"
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
            fullWidth
            variant="standard"
            label="Postcode"
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={e => setCustomer({...customer, city: e.target.value})}
            fullWidth
            variant="standard"
            label="City"
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value})}
            fullWidth
            variant="standard"
            label="Email"
          />
            <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={e => setCustomer({...customer, phone: e.target.value})}
            fullWidth
            variant="standard"
            label="Phone"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}