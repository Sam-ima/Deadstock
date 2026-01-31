import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ImageGrid = ({ images, onAdd, onEdit, onRemove }) => (
  <>
    <Typography fontWeight={600}>Product Images</Typography>

    <Box display="flex" flexWrap="wrap" gap={2}>
      {images.map((img, i) => (
        <Box key={i} sx={{ width: 120, border: "1px solid #ddd", borderRadius: 2 }}>
          <Box component="img" src={img.url} sx={{ width: "100%", height: 100, objectFit: "cover" }} />
          <Box display="flex" justifyContent="space-around">
            <IconButton size="small" onClick={() => onEdit(i)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => onRemove(i)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddPhotoAlternateIcon />}
        onClick={onAdd}
        sx={{ height: 120 }}
      >
        Add Image
      </Button>
    </Box>
  </>
);

export default ImageGrid;