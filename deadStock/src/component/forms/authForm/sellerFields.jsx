import { Box, Divider, TextField } from "@mui/material";

const SellerFields = ({ inputStyle }) => {
  return (
    <>
      <Divider sx={{ my: 1 }}>Business Details</Divider>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField label="Store / Business Name" sx={inputStyle} />
        <TextField label="Phone Number" type="tel" sx={inputStyle} />
        <TextField
          label="Business Address"
          sx={{ gridColumn: "1 / -1", ...inputStyle }}
        />
        <TextField label="City" sx={inputStyle} />
        <TextField label="Country" sx={inputStyle} />
        <TextField
          label="PAN / VAT Number"
          sx={{ gridColumn: "1 / -1", ...inputStyle }}
        />
      </Box>
    </>
  );
};

export default SellerFields;
