import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityControl = ({ quantity, onAdd, onRemove }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={onRemove} disabled={quantity <= 1}>
        <RemoveIcon />
      </IconButton>

      <Typography fontWeight={600}>{quantity}</Typography>

      <IconButton onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantityControl;
