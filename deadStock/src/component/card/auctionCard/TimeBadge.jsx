import { Box } from "@mui/material";

const TimeBadge = ({ timeLeft }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "8px",
        right: "8px",
        backgroundColor: "#f97316",
        color: "#fff",
        padding: "2px 8px",
        borderRadius: "12px",
        fontSize: "0.7rem",
        fontWeight: 700,
        zIndex: 3,
      }}
    >
      {timeLeft}
    </Box>
  );
};

export default TimeBadge;
