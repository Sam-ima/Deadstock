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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import SectionCard from "../../common/sectionCard";

const ShippingInfo = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(
    "123 Sneaker St, Apt 4B, New York"
  );

  return (
    <>
      <Typography variant="h6" mb={1}>
        Shipping
        <IconButton size="small" onClick={() => setOpen(true)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <SectionCard>
        <List>
          <ListItem>
            <ListItemIcon><LocationOnIcon /></ListItemIcon>
            <ListItemText primary="Primary Address" secondary={address} />
          </ListItem>
        </List>
      </SectionCard>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
            label="Address"
            fullWidth
            multiline
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

export default ShippingInfo;
