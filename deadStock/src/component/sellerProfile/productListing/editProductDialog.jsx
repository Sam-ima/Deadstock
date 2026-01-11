import { useEffect,useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const EditProductDialog = ({ open, product, onClose, onSave }) => {
  const [form, setForm] = useState(product || {});

  useEffect(() => {
    setForm(product || {});
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
          />
          <TextField
            label="Current Price"
            type="number"
            name="currentPrice"
            value={form.currentPrice || ""}
            onChange={handleChange}
          />
          <TextField
            label="Base Price"
            type="number"
            name="basePrice"
            value={form.basePrice || ""}
            onChange={handleChange}
          />
          <TextField
            label="Stock"
            type="number"
            name="stock"
            value={form.stock || ""}
            onChange={handleChange}
          />
          {/* <TextField
            label="Rating"
            type="number"
            name="rating"
            value={form.rating || ""}
            onChange={handleChange}
          /> */}
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            value={form.description || ""}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
