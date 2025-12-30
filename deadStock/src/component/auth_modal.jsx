import  { useState } from 'react';
import { Modal, Box, Tabs, Tab, TextField, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function LoginModal({ open, handleClose }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {tabValue === 0 ? (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <Button fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
          </Box>
        ) : (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField fullWidth label="Full Name" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <Button fullWidth variant="contained" sx={{ mt: 2 }}>Register</Button>
          </Box>
        )}
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          B2B users: Use business email for enhanced features.
        </Typography>
      </Box>
    </Modal>
  );
}

export default LoginModal;