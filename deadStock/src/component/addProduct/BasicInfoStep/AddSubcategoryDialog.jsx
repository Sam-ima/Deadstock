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

const AddSubcategoryDialog = ({
  open,
  onClose,
  newSubcategory,
  setNewSubcategory,
  onAddSubcategory,
  errors = {},          // ✅ DEFAULT VALUE
  categoryId,
  categoryName
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { p: 1, borderRadius: 2 } }}
      disableEnforceFocus
      disableAutoFocus
    >
      <DialogTitle sx={{ p: 2, m: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" }, fontWeight: 600 }}>
            Add New Subcategory
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {!categoryId ? (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please select a category first before adding a subcategory.
          </Alert>
        ) : (
          <Alert severity="info" sx={{ mb: 2 }}>
            Adding to: <strong>{categoryName}</strong>
          </Alert>
        )}

        {errors.subcategory && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.subcategory}
          </Alert>
        )}

        <TextField
          autoFocus
          margin="dense"
          label="Subcategory Name *"
          fullWidth
          value={newSubcategory.name || ""}
          onChange={(e) =>
            setNewSubcategory({ ...newSubcategory, name: e.target.value })
          }
          sx={{ mb: 2 }}
          error={Boolean(errors.subcategory)}   // ✅ SAFE
          disabled={!categoryId}
        />

        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={2}
          value={newSubcategory.description || ""}
          onChange={(e) =>
            setNewSubcategory({ ...newSubcategory, description: e.target.value })
          }
          placeholder="Describe this subcategory..."
          disabled={!categoryId}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onAddSubcategory}
          disabled={!categoryId}
        >
          Add Subcategory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubcategoryDialog;
