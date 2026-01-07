import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import GavelIcon from "@mui/icons-material/Gavel";
import PaymentsIcon from "@mui/icons-material/Payments";

const steps = [
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 48 ,color:"#176337ff"}} color="primary" />,
    title: "Register & Discover",
    description: "Explore unique items and auctions."
  },
  {
    icon: <GavelIcon sx={{ fontSize: 48 ,color:"#176337ff"}} color="primary" />,
    title: "Place Your Bid",
    description: "Bid live and track auctions in real time."
  },
  {
    icon: <PaymentsIcon sx={{ fontSize: 48,color:"#176337ff" }} color="primary" />,
    title: "Win & Pay",
    description: "Secure checkout after winning."
  }
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: 9, backgroundColor: "#f9f9f9" }}>
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={6}
      >
        How It Works
      </Typography>

      {/* Centered Content */}
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} md={3} textAlign="center">
                <Box mb={3}>{step.icon}</Box>

                <Typography
                  fontWeight={600}
                  fontSize="1.2rem"
                  mb={1.5}
                >
                  {step.title}
                </Typography>

                <Typography
                  fontSize="1rem"
                  color="text.secondary"
                  lineHeight={1.6}
                >
                  {step.description}
                </Typography>
              </Grid>

              {/* Divider */}
              {index < steps.length - 1 && (
                <Grid
                  item
                  xs={12}
                  md={1}
                  display="flex"
                  justifyContent="center"
                >
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      height: 80,
                      display: { xs: "none", md: "block" }
                    }}
                  />
                  <Divider
                    sx={{
                      display: { xs: "block", md: "none" },
                      width: "100%",
                      my: 3
                    }}
                  />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HowItWorks;
