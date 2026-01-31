import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FeaturesSection = ({ features, setFeatures }) => (
  <>
    <Typography fontWeight={600}>Features</Typography>

    {features.map((f, i) => (
      <Box key={i} display="flex" gap={1}>
        <TextField
          value={f}
          onChange={(e) =>
            setFeatures(p => p.map((x, idx) => idx === i ? e.target.value : x))
          }
          fullWidth
        />
        <IconButton onClick={() => setFeatures(p => p.filter((_, idx) => idx !== i))}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ))}

    <Button onClick={() => setFeatures(p => [...p, ""])}>+ Add Feature</Button>
  </>
);

export default FeaturesSection;