import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const EMPTY_PRODUCT = {
  name: "",
  currentPrice: "",
  basePrice: "",
  stock: "",
  description: "",
};

const EditProductDialog = ({ open, product, onClose, onSave }) => {
  const [form, setForm] = useState(EMPTY_PRODUCT);

  // Sync form when dialog opens or product changes
  useEffect(() => {
    if (open && product) {
      setForm({
        ...EMPTY_PRODUCT,
        ...product,
      });
    }
  }, [open, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Current Price"
            name="currentPrice"
            type="number"
            value={form.currentPrice}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Base Price"
            name="basePrice"
            type="number"
            value={form.basePrice}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => onSave({ ...product, ...form })}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
