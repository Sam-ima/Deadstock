import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const BusinessDialog = ({
  open,
  setOpen,
  business,
  setBusiness,
  onSave,
}) => {
  const fieldLabels = {
    shopName: "Shop Name",
    phone: "Phone Number",
    address: "Address",
    city: "City",
    country: "Country",
    panVat: "PAN / VAT Number",
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>Business Details</DialogTitle>
      <DialogContent>
        {Object.keys(business).map((key) => (
          <TextField
            key={key}
            label={fieldLabels[key]}
            fullWidth
            margin="dense"
            onChange={(e) =>
              setBusiness({ ...business, [key]: e.target.value })
            }
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          Save & Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default BusinessDialog;
