import { Typography, Stack, Link } from "@mui/material";

const FooterLinks = () => {
  return (
    <Stack spacing={1.2}>
      <Typography variant="h6" fontWeight={700}>
        Quick Links
      </Typography>

      <Link href="/" underline="hover" color="inherit">
        Home
      </Link>
      <Link href="/auctions" underline="hover" color="inherit">
        Auction
      </Link>
      {/* <Link href="/upcoming" underline="hover" color="inherit">
        Upcoming Auctions
      </Link> */}
      <Link href="/contact" underline="hover" color="inherit">
        Contact Us
      </Link>
    </Stack>
  );
};

export default FooterLinks;
