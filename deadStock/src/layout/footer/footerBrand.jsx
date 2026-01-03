import { Box, Typography } from "@mui/material";
import DeadstockLogo from "../../assets/deadstock_logo.png";

const FooterBrand = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          component="img"
          src={DeadstockLogo}
          alt="Deadstock Logo"
          sx={{ height: 40, mr: 2 }}
        />
        <Typography variant="h6" fontWeight={700}>
          Deadstock
        </Typography>
      </Box>

      <Typography sx={{ fontSize: "0.9rem", opacity: 0.9, maxWidth: 320 }}>
        Bringing you rare collectibles and exclusive auctions from around the
        world.
      </Typography>
    </Box>
  );
};

export default FooterBrand;
