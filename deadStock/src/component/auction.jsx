import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  Avatar,
  Stack,
  Divider,
  Chip
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedIcon from "@mui/icons-material/Verified";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

/* ---------------------- HOW IT WORKS ---------------------- */
export const HowItWorks = () => (
  <Box sx={{ py: 10, textAlign: "center" }}>
    <Typography variant="h4" fontWeight={800} mb={5}>
      How It Works
    </Typography>
    <Grid container spacing={4}>
      {[
        { step: "01", title: "Register & Discover", desc: "Find rare items and join the auction community." },
        { step: "02", title: "Place Your Bid", desc: "Set your max bid and track the live countdown." },
        { step: "03", title: "Win & Pay", desc: "Secure checkout once the hammer falls." }
      ].map((item) => (
        <Grid item xs={12} md={4} key={item.step}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Typography variant="h3" color="primary">
              {item.step}
            </Typography>
            <Typography variant="h6" fontWeight={700} mt={2}>
              {item.title}
            </Typography>
            <Typography color="text.secondary" mt={1}>
              {item.desc}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ---------------------- ENDING SOON ---------------------- */
export const EndingSoon = () => (
  <Box sx={{ py: 10, backgroundColor: "#FFF5F5" }}>
    <Typography variant="h4" fontWeight={800} mb={5} textAlign="center">
      🔥 Ending Soon
    </Typography>
    <Grid container spacing={3}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} md={4} key={item}>
          <Card sx={{ p: 3 }}>
            <Chip label="HOT" color="error" size="small" />
            <Typography fontWeight={700} mt={2}>
              Vintage Sneaker #{item}
            </Typography>
            <Typography color="text.secondary">
              Current Bid: $450
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mt={2}>
              <AccessTimeIcon fontSize="small" />
              <Typography>01:12:45</Typography>
            </Stack>
            <Button
              fullWidth
              variant="contained"
              startIcon={<GavelIcon />}
              sx={{ mt: 3 }}
            >
              Bid Now
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ---------------------- UPCOMING AUCTIONS ---------------------- */
export const UpcomingAuctions = () => (
  <Box sx={{ py: 10 }}>
    <Typography variant="h4" fontWeight={800} mb={5} textAlign="center">
      Upcoming Auctions
    </Typography>
    <Grid container spacing={3}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} md={4} key={item}>
          <Card sx={{ p: 3 }}>
            <Typography fontWeight={700}>
              Luxury Watch Drop #{item}
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Starts: Sep 25, 10:00 AM
            </Typography>
            <Button
              startIcon={<NotificationsActiveIcon />}
              variant="outlined"
              fullWidth
              sx={{ mt: 3 }}
            >
              Remind Me
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ---------------------- LIVE ACTIVITY ---------------------- */
export const LiveActivity = () => (
  <Box sx={{ py: 8, backgroundColor: "#F9FAFB" }}>
    <Typography variant="h5" fontWeight={700} mb={3}>
      Live Activity
    </Typography>
    <Stack spacing={2}>
      {[
        "User123 placed $500 on Vintage Watch",
        "Jordan 1 Retro sold for $1,200",
        "UserX bid $300 on Classic Camera"
      ].map((text, i) => (
        <Typography key={i}>• {text}</Typography>
      ))}
    </Stack>
  </Box>
);

/* ---------------------- SELLER SPOTLIGHT ---------------------- */
export const SellerSpotlight = () => (
  <Box sx={{ py: 10 }}>
    <Typography variant="h4" fontWeight={800} mb={5} textAlign="center">
      Seller Spotlight
    </Typography>
    <Grid container spacing={3}>
      {[1, 2].map((item) => (
        <Grid item xs={12} md={6} key={item}>
          <Card sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar />
              <Box>
                <Typography fontWeight={700}>
                  Verified Seller #{item}
                </Typography>
                <Typography color="text.secondary">
                  120+ Items Sold
                </Typography>
              </Box>
              <VerifiedIcon color="primary" />
            </Stack>
            <Button variant="outlined" sx={{ mt: 3 }}>
              Follow Seller
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ---------------------- TRUST & SECURITY ---------------------- */
export const TrustSecurity = () => (
  <Box sx={{ py: 10, backgroundColor: "#F0FDF4", textAlign: "center" }}>
    <Typography variant="h4" fontWeight={800} mb={4}>
      Safe & Secure Bidding
    </Typography>
    <Grid container spacing={3}>
      {[
        "Verified Authenticators",
        "Secure Escrow Payments",
        "24/7 Customer Support"
      ].map((item) => (
        <Grid item xs={12} md={4} key={item}>
          <Card sx={{ p: 3 }}>
            <Typography fontWeight={700}>{item}</Typography>
            <Typography color="text.secondary" mt={1}>
              Your money and items are protected.
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ---------------------- STATS ---------------------- */
export const StatsBar = () => (
  <Box sx={{ py: 6 }}>
    <Divider />
    <Grid container spacing={3} textAlign="center" mt={3}>
      {[
        { label: "Items Sold", value: "12K+" },
        { label: "Active Bidders", value: "8K+" },
        { label: "Total Volume", value: "$4.2M" },
        { label: "Countries", value: "32+" }
      ].map((stat) => (
        <Grid item xs={6} md={3} key={stat.label}>
          <Typography variant="h5" fontWeight={800}>
            {stat.value}
          </Typography>
          <Typography color="text.secondary">
            {stat.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
);
