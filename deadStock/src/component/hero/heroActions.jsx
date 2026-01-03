import { Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HeroActions = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
        alignItems: "center",
        gap: 2,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          background: "linear-gradient(135deg, #0b3d2e 0%, #145a43 100%)",
          color: "#fff",
          px: { xs: 3, md: 4 },
          py: 1.4,
          borderRadius: "30px",
          textTransform: "none",
          fontSize: "1rem",
          width: { xs: "100%", sm: "auto" },
          "&:hover": {
            background: "#101111ff",
          },
        }}
      >
        Start Buying
      </Button>

      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          background: "#c5791bff",
          color: "#fff",
          px: { xs: 3, md: 4 },
          py: 1.4,
          borderRadius: "30px",
          textTransform: "none",
          fontSize: "1rem",
          width: { xs: "100%", sm: "auto" },
          "&:hover": {
            background: "#101111ff",
          },
        }}
      >
        Start Selling
      </Button>
    </Box>
  );
};

export default HeroActions;
