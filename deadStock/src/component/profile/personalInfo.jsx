import { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import SectionCard from "../../common/sectionCard";

const PersonalInfo = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    email: "j.smith@example.com",
    phone: "+1 (555) 000-0000",
  });

  return (
    <>
      <Typography variant="h6" mb={1}>
        Personal Info
        <IconButton size="small" onClick={() => setOpen(true)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <SectionCard>
        <List>
          <ListItem>
            <ListItemIcon><EmailIcon /></ListItemIcon>
            <ListItemText primary="Email" secondary={info.email} />
          </ListItem>

          <ListItem>
            <ListItemIcon><PhoneIcon /></ListItemIcon>
            <ListItemText primary="Phone" secondary={info.phone} />
          </ListItem>
        </List>
      </SectionCard>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={info.email}
            onChange={(e) =>
              setInfo({ ...info, email: e.target.value })
            }
          />
          <TextField
            label="Phone"
            fullWidth
            margin="dense"
            value={info.phone}
            onChange={(e) =>
              setInfo({ ...info, phone: e.target.value })
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

export default PersonalInfo;
