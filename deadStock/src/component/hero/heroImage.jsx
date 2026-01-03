import { Box } from "@mui/material";
import HomeImage from "../../assets/dead_stock_image-removebg-preview.png";
import { floatAnimation } from "../ui/animations";

const HeroImage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: `${floatAnimation} 5s ease-in-out infinite`,
        mt: { xs: 4, md: 0 },
      }}
    >
      <Box
        component="img"
        src={HomeImage}
        alt="Hero"
        sx={{
          width: "100%",
          maxWidth: {
            xs: "320px",
            sm: "350px",
            md: "350px",
            lg: "600px",
          },
          height: "auto",
          filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.3))",
        }}
      />
    </Box>
  );
};

export default HeroImage;
