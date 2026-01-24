import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  IconButton,
  Box
} from "@mui/material";
import { Close } from "@mui/icons-material";

const AddCategoryDialog = ({
  open,
  onClose,
  newCategory,
  setNewCategory,
  onAddCategory,
  errors
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          p: 1,
          borderRadius: 2
        }
      }}
      disableEnforceFocus
      disableAutoFocus
    >
      <DialogTitle sx={{ p: 2, m: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" }, fontWeight: 600 }}>
            Add New Category
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {errors?.category && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.category}
          </Alert>
        )}

        <TextField
          autoFocus
          margin="dense"
          label="Category Name *"
          fullWidth
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          sx={{ mb: 2 }}
          error={!!errors?.category}
        />

        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          placeholder="Describe this category..."
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onAddCategory}>
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
