import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import {
  Tag,
  Layers,
  ClipboardList,
} from "lucide-react";

const categories = ["Clothing", "Electronics", "Furniture"];
// const conditions = ["New", "Like New", "Used"];

const BasicInfoSection = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        p: { xs: 3, md: 4 },
        background: `
          linear-gradient(#fff, #fff) padding-box,
          linear-gradient(135deg, #22c55e, #f97316) border-box
        `,
        border: "1px solid transparent",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(34,197,94,0.12), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={4} flexDirection="column">
       

        <Box>
          <Typography fontSize={20} fontWeight={800}>
            Product Details
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            Help buyers understand your item better
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{display:"flex",flexDirection:"column"}}>
        {/* Category */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Category"
            fullWidth
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Layers size={16} />
                </InputAdornment>
              ),
            }}
          >
           
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Product Name */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Product Name"
            placeholder="Vintage Leather Jacket"
            fullWidth
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tag size={16} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Condition */}
        {/* <Grid item xs={12} md={6}>
          <TextField
            select
            label="Condition"
            fullWidth
            sx={modernInput}
          >
           
            {conditions.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            placeholder="Describe features, condition, flaws, and story behind this item..."
            fullWidth
            sx={{
              ...modernInput,
              "& textarea": { lineHeight: 1.7 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ClipboardList size={16} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicInfoSection;

const modernInput = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "#fafafa",
    fontSize: 14.5,
    transition: "all .25s ease",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#22c55e",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 4px rgba(34,197,94,0.15)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22c55e",
    },
  },
};
