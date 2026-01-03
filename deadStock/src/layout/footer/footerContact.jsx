import { Typography, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterContact = () => {
  return (
    <Stack spacing={1.2}>
      <Typography variant="h6" fontWeight={700}>
        Contact Us
      </Typography>

      <Typography sx={{ fontSize: "0.9rem", opacity: 0.9 }}>
        Email: support@auctionhouse.com
      </Typography>

      <Typography sx={{ fontSize: "0.9rem", opacity: 0.9 }}>
        Phone: +1 234 567 890
      </Typography>

      <Stack direction="row" spacing={1} mt={1}>
        {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon].map(
          (Icon, index) => (
            <IconButton
              key={index}
              sx={{
                color: "#d8a855ff",
                "&:hover": { color: "#fff" },
              }}
              target="_blank"
            >
              <Icon />
            </IconButton>
          )
        )}
      </Stack>
    </Stack>
  );
};

export default FooterContact;
