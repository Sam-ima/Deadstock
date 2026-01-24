import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert
} from "@mui/material";

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
      disableEnforceFocus
      disableAutoFocus
    >
      <DialogTitle sx={{
            fontSize: { xs: "1.1rem", sm: "1.25rem" }
          }}>Add New Category</DialogTitle>

      <DialogContent>
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

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onAddCategory}>
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
