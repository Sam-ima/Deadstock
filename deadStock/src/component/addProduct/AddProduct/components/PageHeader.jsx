// components/PageHeader.jsx
import { Box, Typography, Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";

const PageHeader = ({ user, onBack }) => (
  <Box
    sx={{
      mb: { xs: 3, sm: 4 },
      display: "flex",
      flexDirection: "column",
      gap: { xs: 1.5, sm: 2 }
    }}
  >
    {/* Back Button */}
    <Button
      startIcon={<ArrowLeft size={18} />}
      onClick={onBack}
      sx={{
        alignSelf: "flex-start",
        mb: { xs: 1, sm: 2 },
        px: { xs: 1.5, sm: 2 },
        fontSize: { xs: "0.85rem", sm: "0.95rem" }
      }}
    >
      Back
    </Button>

    {/* Title */}
    <Typography
      fontWeight={800}
      sx={{
        fontSize: {
          xs: "1.4rem",   // mobile
          sm: "1.8rem",   // tablet
          md: "2 rem"    // desktop
        },
        lineHeight: 1.2
      }}
    >
      Add New Product
    </Typography>

    {/* Seller Info */}
    <Typography
      sx={{
        color: "text.secondary",
        fontSize: {
          xs: "0.8rem",
          sm: "0.9rem",
          md: "1rem"
        },
        wordBreak: "break-word"
      }}
    >
      Seller: {user?.email || "Not logged in"} • {user?.userType || "B2C"}
    </Typography>
  </Box>
);

export default PageHeader;
