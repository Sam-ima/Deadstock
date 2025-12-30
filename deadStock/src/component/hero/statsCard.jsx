import React from "react";
import { Box, Typography } from "@mui/material";
import { GlowingCard } from "../ui/styledComponents";

const StatsCard = ({ icon: Icon, color, value, label }) => {
  return (
    <GlowingCard>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: `rgba(${color}, 0.2)`,
              borderRadius: "10px",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon color={color} size={20} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: color }}
            >
              {value}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}
            >
              {label}
            </Typography>
          </Box>
        </Box>
      </Box>
    </GlowingCard>
  );
};

export default StatsCard;