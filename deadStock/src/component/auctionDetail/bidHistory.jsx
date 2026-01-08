import React from "react";
import { Paper, Stack, Typography, Box } from "@mui/material";

const BidHistory = () => {
  const bids = [
    { bidder: "AlexJohnson", amount: 9200, time: "2 hours ago" },
    // { bidder: "SarahW", amount: 9100, time: "3 hours ago" },
    // { bidder: "Mike88", amount: 9000, time: "5 hours ago" },
    // { bidder: "CollectorPro", amount: 8900, time: "1 day ago" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: { xs: 2, md: 3 },
        backgroundColor: "#f8fff8",
        border: "1px solid #e0f2e1",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ color: "#1B5E20", mb: { xs: 2, sm: 3 } }}
      >
        Recent Bids
      </Typography>

      <Stack spacing={{ xs: 1, sm: 2 }}>
        {bids.map((bid, index) => (
          <Box
            key={index}
            sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: 2,
              backgroundColor: "white",
              borderLeft: `4px solid ${index === 0 ? "#d8a855" : "#4CAF50"}`,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateX(3px)",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                >
                  {bid.bidder}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: 10, sm: 11, md: 12 } }}
                >
                  {bid.time}
                </Typography>
              </Box>

              <Typography
                variant="body1"
                fontWeight={700}
                sx={{
                  color: "#2E7D32",
                  fontSize: { xs: 12, sm: 14, md: 16 },
                }}
              >
                ${bid.amount.toLocaleString()}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default BidHistory;
  