import React from "react";
import { Box, Typography, Grid, Link, IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DeadstockLogo from "../assets/deadstock_logo.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#194638ff", // dark green
        color: "#fff",
        mt: 8,
        py: 6,
        px: { xs: 3, md: 8 },
      }}
    >
      <Grid container spacing={4}>
        {/* Company Info */}
              <Grid item xs={12} md={4}>
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
          <Typography sx={{ fontSize: "0.9rem" }}>
            Bringing you rare collectibles and exclusive auctions from around the world.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Link href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Link href="/auctions" underline="hover" color="inherit">
              Live Auctions
            </Link>
            <Link href="/upcoming" underline="hover" color="inherit">
              Upcoming Auctions
            </Link>
            <Link href="/contact" underline="hover" color="inherit">
              Contact Us
            </Link>
          </Stack>
        </Grid>

        {/* Contact & Social */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Contact Us
          </Typography>
          <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
            Email: support@auctionhouse.com
          </Typography>
          <Typography sx={{ fontSize: "0.9rem", mb: 2 }}>
            Phone: +1 234 567 890
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{ color: "#d8a855ff" }}
              href="https://facebook.com"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#d8a855ff" }}
              href="https://instagram.com"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#d8a855ff" }}
              href="https://twitter.com"
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#d8a855ff" }}
              href="https://linkedin.com"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Divider */}
      <Box sx={{ borderTop: "1px solid #d8a85533", mt: 4, pt: 3, textAlign: "center" }}>
        <Typography sx={{ fontSize: "0.85rem", color: "#d8a855ff" }}>
          © {new Date().getFullYear()} AuctionHouse. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
