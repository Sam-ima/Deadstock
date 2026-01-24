// components/checkout/ProgressBar.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "./Constants";

const ProgressBar = ({ activeStep, steps }) => {
  return (
    <Box sx={{ position: "relative", mb: 6 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 3,
          bgcolor: colors.border,
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: `${(activeStep + 1) * 33.33}%`,
          height: 3,
          background: colors.primaryGradient,
          transform: "translateY(-50%)",
          zIndex: 2,
          transition: "width 0.5s ease",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 3,
        }}
      >
        {steps.map((label, index) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: index <= activeStep ? colors.primary : colors.border,
                color:
                  index <= activeStep ? colors.textLight : colors.textSecondary,
                fontWeight: 600,
                fontSize: "1.1rem",
                mb: 1,
                transition: "all 0.3s ease",
              }}
            >
              {index === 0 ? "📧" : index === 1 ? "🚚" : "💳"}
            </Box>
            <Typography
              variant="caption"
              fontWeight={600}
              color={
                index === activeStep ? colors.primary : colors.textSecondary
              }
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressBar;
