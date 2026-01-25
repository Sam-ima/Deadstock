// components/checkout/steps/components/ShippingRow.jsx
import React from "react";
import { Box } from "@mui/material";

const ShippingRow = React.memo(({ children, spacing = 2 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: spacing,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { sm: "flex-start" },
      }}
    >
      {children}
    </Box>
  );
});

ShippingRow.displayName = "ShippingRow";

export default ShippingRow;
