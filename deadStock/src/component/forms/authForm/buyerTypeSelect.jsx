import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const BuyerTypeSelector = ({ buyerType, setBuyerType }) => {
  return (
    <ToggleButtonGroup
      value={buyerType}
      exclusive
      fullWidth
      onChange={(_, value) => value && setBuyerType(value)}
      sx={{ mb: 1 }}
    >
      <ToggleButton value="customer">As Customer</ToggleButton>
      <ToggleButton value="business">Use Business Details</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default BuyerTypeSelector;
