import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HeroActions = ({ saleType }) => {
  const navigate = useNavigate();
  const isAuction = saleType === "auction";

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
        onClick={() =>
          navigate(isAuction ? "/auctions" : "/category/electronics")
        }
        sx={{
          background: "linear-gradient(135deg, #0b3d2e 0%, #145a43 100%)",
          color: "#fff",
          px: { xs: 3, md: 4 },
          py: 1.4,
          borderRadius: "30px",
          textTransform: "capitalize",
          fontSize: "1rem",
          width: { xs: "100%", sm: "auto" },
          "&:hover": {
            background: "#101111ff",
          },
        }}
      >
        {isAuction ? "View Bidding Products" : "Shop Products"}
      </Button>
    </Box>
  );
};

export default HeroActions;
