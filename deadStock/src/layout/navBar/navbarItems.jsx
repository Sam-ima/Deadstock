import { Box, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MAX_VISIBLE_ITEMS = 5;

const DesktopMenu = ({ items, scrolled }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        mt: 1,
        width: 220,
        maxHeight: `${MAX_VISIBLE_ITEMS * 44}px`, // 5 items
        overflowY: "auto",
        backgroundColor: "#fff",
        borderRadius: 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        zIndex: 1000,

        /* Scrollbar styling */
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#999",
        },
      }}
    >
      {items.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() =>
            navigate(
              typeof item === "string"
                ? `/category/${item.toLowerCase()}`
                : `/category/${item.label.toLowerCase()}`
            )
          }
          sx={{
            fontSize: "0.9rem",
            py: 1.2,
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Typography noWrap>
            {typeof item === "string" ? item : item.label}
          </Typography>
        </MenuItem>
      ))}
    </Box>
  );
};

export default DesktopMenu;
