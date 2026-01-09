import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Fade,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { color } from "framer-motion";

const profileHeader = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Roshni Giri",
    username: "rowsnee",
    avatar: "/avatar.png",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  return (
    <>
      <Fade in>
        <Box textAlign="center" mb={4}>
          <Box position="relative" display="inline-block">
            <Avatar src={profile.avatar} sx={{ width: 120, height: 120 }} />
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "primary.main",
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Typography variant="h5" mt={2}>
            {profile.name}
          </Typography>
          <Typography color="text.secondary">
            {profile.username}
          </Typography>

          <Chip label="VERIFIED" color="success" sx={{ mt: 1 }} />
        </Box>
      </Fade>

      {/* Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box textAlign="center" mb={2}>
            <Avatar src={profile.avatar} sx={{ width: 80, height: 80, mx: "auto" }} />
            <Button component="label" size="small">
              Change Photo
              <input hidden type="file" onChange={handleAvatarChange} />
            </Button>
          </Box>

          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="orange">Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default profileHeader;
// components/ProfileHeader.jsx
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { Verified as VerifiedIcon } from '@mui/icons-material';

const ProfileHeader = () => {
  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
          My Profile
        </Typography>
        
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px',
            bgcolor: '#1976d2',
            fontSize: '1.5rem'
          }}
        >
          JS
        </Avatar>
        
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Jordan Smith
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            @jordankicks
          </Typography>
          <VerifiedIcon color="primary" fontSize="small" />
        </Box>
        
        <Chip
          label="VERIFIED SELLER"
          size="small"
          sx={{
            fontSize: '0.7rem',
            height: 24,
            bgcolor: '#e3f2fd',
            color: '#1976d2',
            fontWeight: 'bold'
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
