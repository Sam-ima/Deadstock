import { Box, Button } from "@mui/material";

const DesktopMenu = ({ items }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: 1,
        minWidth: 180,
        zIndex: 99,
        py: 1,
      }}
    >
      {items.map((item) => (
        <Button
          key={item}
          fullWidth
          sx={{
            justifyContent: "flex-start",
            px: 2,
            py: 1,
            textTransform: "none",
            color: "#000",
            "&:hover": { background: "#f0f0f0" },
          }}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopMenu;
