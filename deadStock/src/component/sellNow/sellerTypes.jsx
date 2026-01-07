import { Box, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SellerCard = ({ title, subtitle, items, dark }) => (
  <Box
    sx={{
      p: 4,
      borderRadius: 4,
      bgcolor: dark ? "#0B2A1E" : "#fff",
      color: dark ? "#fff" : "#000",
      boxShadow: 3,
    }}
  >
    <Typography fontWeight={700}>{title}</Typography>
    <Typography variant="caption" color={dark ? "#1DE96B" : "success.main"}>
      {subtitle}
    </Typography>

    {items.map((item, i) => (
      <Box key={i} display="flex" gap={1} mt={2}>
        <CheckCircleIcon sx={{ color: dark ? "#1DE96B" : "success.main" }} />
        <Typography variant="body2">{item}</Typography>
      </Box>
    ))}
  </Box>
);

const SellerTypes = () => {
  return (
    <Box py={8} px={2}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <SellerCard
            title="B2C Seller"
            subtitle="INDIVIDUAL"
            items={[
              "No minimum quantity required",
              "Standard email verification",
              "Easy prepaid shipping labels",
            ]}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <SellerCard
            title="B2B Seller"
            subtitle="BUSINESS"
            dark
            items={[
              "Minimum 50 units per listing",
              "Business License & Tax ID required",
              "Access to bulk tools & freight logic",
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerTypes;
