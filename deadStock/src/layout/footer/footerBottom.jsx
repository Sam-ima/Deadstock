import { Box, Typography, Container } from "@mui/material";

const FooterBottom = () => {
  return (
    <Box
      sx={{
        borderTop: "1px solid #d8a85533",
        mt: 6,
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          sx={{ fontSize: "0.85rem", color: "#d8a855ff" }}
        >
          © {new Date().getFullYear()} AuctionHouse. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default FooterBottom;
