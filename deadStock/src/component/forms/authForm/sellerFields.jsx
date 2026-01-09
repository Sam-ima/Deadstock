import { Box, Divider, TextField } from "@mui/material";

const SellerFields = ({ inputStyle, form, onChange }) => {
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
        <TextField
          label="Store / Business Name"
          name="shopName"
          value={form.shopName}
          onChange={onChange}
          sx={inputStyle}
        />

        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          sx={inputStyle}
        />

        <TextField
          label="Business Address"
          name="address"
          value={form.address}
          onChange={onChange}
          sx={{ gridColumn: "1 / -1", ...inputStyle }}
        />

        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={onChange}
          sx={inputStyle}
        />

        <TextField
          label="Country"
          name="country"
          value={form.country}
          onChange={onChange}
          sx={inputStyle}
        />

        <TextField
          label="PAN / VAT Number"
          name="panVat"
          value={form.panVat}
          onChange={onChange}
          sx={{ gridColumn: "1 / -1", ...inputStyle }}
        />
      </Box>
    </>
  );
};

export default SellerFields;
