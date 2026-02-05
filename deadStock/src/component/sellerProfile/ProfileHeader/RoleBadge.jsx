import { Typography } from "@mui/material";

const RoleBadge = ({ buyer }) => {
  const getBadgeLabel = () => {
    if (buyer.role === "both") return "Buyer & Seller";
    if (buyer.role === "buyer")
      return buyer.buyerType === "business"
        ? "Business Buyer"
        : "Personal Buyer";
    return "Seller";
  };

  return (
    <Typography
      variant="body2"
      sx={{
        mt: 0.5,
        display: "inline-block",
        px: 2,
        py: 0.5,
        borderRadius: "999px",
        bgcolor: buyer.role === "both" ? "success.light" : "orange",
        color: "text.primary",
        fontWeight: 500,
      }}
    >
      {getBadgeLabel()}
    </Typography>
  );
};

export default RoleBadge;
