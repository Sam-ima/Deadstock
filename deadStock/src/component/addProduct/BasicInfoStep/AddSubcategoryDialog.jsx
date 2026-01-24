import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert
} from "@mui/material";

const AddSubcategoryDialog = ({
    open,
    onClose,
    newSubcategory,
    setNewSubcategory,
    onAddSubcategory,
    errors,
    categoryId,
    categoryName
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
            }}>Add New Subcategory</DialogTitle>

            <DialogContent>
                {!categoryId ? (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        Please select a category first before adding a subcategory.
                    </Alert>
                ) : (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        Adding to: <strong>{categoryName}</strong>
                    </Alert>
                )}

                {errors?.subcategory && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.subcategory}
                    </Alert>
                )}

                <TextField
                    autoFocus
                    margin="dense"
                    label="Subcategory Name *"
                    fullWidth
                    value={newSubcategory.name}
                    onChange={(e) =>
                        setNewSubcategory({ ...newSubcategory, name: e.target.value })
                    }
                    sx={{ mb: 2 }}
                    error={!!errors.subcategory}
                    disabled={false} // can always type
                />

                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={2}
                    value={newSubcategory.description}
                    onChange={(e) =>
                        setNewSubcategory({
                            ...newSubcategory,
                            description: e.target.value
                        })
                    }
                    placeholder="Describe this subcategory..."
                    disabled={!categoryId}
                />
            </DialogContent>

            <DialogActions>
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
