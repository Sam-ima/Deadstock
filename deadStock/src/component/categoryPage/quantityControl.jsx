import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantityControl = ({ quantity, onAdd, onRemove }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton size="small" onClick={onRemove}>
        <RemoveIcon fontSize="small" />
      </IconButton>

      <Typography fontWeight={600}>{quantity}</Typography>

      <IconButton size="small" onClick={onAdd}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QuantityControl;
