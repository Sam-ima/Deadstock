import { Box, IconButton, Switch, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SellingActions = ({ item, onEdit, onDelete, onToggleBidding }) => {
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        width: { xs: 270, sm: 280, md: 280 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1,
        px: 1,
        py: 0.5,
        borderRadius: "999px",
      }}
    >
      {/* Bidding */}
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="caption" fontWeight={600} color="text.secondary">
          Bidding
        </Typography>
        <Switch
          size="small"
          color="success"
          checked={!item.isDepreciating}
          onChange={(e) =>
            onToggleBidding(item.id, e.target.checked ? false : true)
          }
        />
      </Box>

      {/* Edit / Delete */}
      <Box display="flex" gap={0.5}>
        <IconButton
          size="small"
          onClick={() => onEdit(item)}
          sx={{
            bgcolor: "#e8f5e9",
            color: "#2e7d32",
            "&:hover": { bgcolor: "#2e7d32", color: "#fff" },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => onDelete(item.id)}
          sx={{
            bgcolor: "#fdecea",
            color: "#d32f2f",
            "&:hover": { bgcolor: "#d32f2f", color: "#fff" },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SellingActions;
