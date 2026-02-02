import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Divider,
} from "@mui/material";

const SellerContractDialog = ({
  open,
  onClose,
  onAgree,
  signature,
  setSignature,
  agreed,
  setAgreed,
  saving,
}) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Seller Agreement</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Please read and accept the agreement before listing products.
        </Typography>

        <Box
          sx={{
            bgcolor: "#f9fafb",
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Selling Rules
          </Typography>

          <Typography variant="body2">
            • Products must be genuine and legally owned
          </Typography>
          <Typography variant="body2">
            • Orders must be fulfilled on time
          </Typography>
          <Typography variant="body2">
            • Misleading listings are prohibited
          </Typography>

     

          <Typography variant="body2">
            • Platform commission:{" "}
            <strong style={{ color: "#d97706" }}>2% per successful sale</strong>
          </Typography>

          <Typography variant="body2" >
            • Repeated violations may result in account suspension
          </Typography>
        </Box>

        <TextField
          label="Signature (Full Name)"
          fullWidth
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <FormControlLabel
          sx={{ mt: 1 }}
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          }
          label="I have read and agree to the selling terms and commission policy"
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onAgree} disabled={saving}>
          {saving ? "Saving..." : "Agree & Continue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellerContractDialog;
