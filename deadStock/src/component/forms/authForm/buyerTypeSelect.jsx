import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { User, Briefcase } from "lucide-react";

const BuyerTypeSelector = ({ buyerType, setBuyerType }) => {
  return (
    <Box>
      <ToggleButtonGroup
        value={buyerType}
        exclusive
        fullWidth
        onChange={(_, value) => value && setBuyerType(value)}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          p: 0.5,
          gap: 0.5,
          // boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <ToggleButton
          value="customer"
          sx={{
            flex: 1,
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
            py: 1.2,
            gap: 1,
            transition: "all 0.25s ease",
            border: "none",
            "&.Mui-selected": {
              background: "#e19662",

              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <User size={18} />
          As Customer
        </ToggleButton>

        <ToggleButton
          value="business"
          sx={{
            flex: 1,
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
            py: 1.2,
            gap: 1,
            transition: "all 0.25s ease",
            border: "none",
            "&.Mui-selected": {
              background: "#e19662",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Briefcase size={18} />
          Business
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default BuyerTypeSelector;
