import React from "react";
import { Box, Typography } from "@mui/material";
import { Zap } from "lucide-react";
import { pulseAnimation } from "../ui/animations";

const BrandLogo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #FB923C, #F59E0B)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: `${pulseAnimation} 2s ease-in-out infinite`,
        }}
      >
        <Zap size={24} color="white" />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          letterSpacing: "0.2em",
          color: "#FB923C",
          textTransform: "uppercase"
        }}
      >
        FALONS
      </Typography>
    </Box>
  );
};

export default BrandLogo;