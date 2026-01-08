import { Card, Typography, IconButton, Box, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const productCard = ({ product, onDelete }) => {
  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2} alignItems="center">
          <Avatar
            src={product.image}
            variant="rounded"
            sx={{ width: 56, height: 56 }}
          />

          <Box>
            <Typography fontWeight={600}>{product.title}</Typography>
            <Typography>${product.price}</Typography>
          </Box>
        </Box>

        <Box>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(product.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default productCard;
