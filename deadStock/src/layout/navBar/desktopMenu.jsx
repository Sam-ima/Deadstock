import { Box, Button } from "@mui/material";

const ITEM_HEIGHT = 35;
const MAX_ITEMS = 5;

const DesktopMenu = ({ items = [], onItemClick }) => {
  // Safety guard
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        borderRadius: 1,
        minWidth: 200,
        zIndex: 99,
        maxHeight: ITEM_HEIGHT * MAX_ITEMS,
        overflowY: "auto",
        py: 0.1,
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d1d1d1",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#a8a8a8",
        },
      }}
    >
      {items.map((item) => (
        <Button
          key={item.slug}  // ✅ Use slug as key
          fullWidth
          onClick={() => onItemClick && onItemClick(item.slug)} // ✅ handle click
          sx={{
            justifyContent: "flex-start",
            px: 2,
            height: ITEM_HEIGHT,
            textTransform: "none",
            fontSize: "0.9rem",
            color: "#000",
            borderRadius: 0,
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          {item.name} {/* ✅ Render only the name */}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopMenu;
