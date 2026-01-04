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

const ProfileHeader = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jordan Smith",
    username: "@jordankicks",
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

          <Chip label="VERIFIED BUYER" color="primary" sx={{ mt: 1 }} />
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileHeader;
