import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SpecificationsSection = ({ specifications, setSpecifications }) => (
  <>
    <Typography fontWeight={600}>Specifications</Typography>

    {specifications.map((s, i) => (
      <Box key={i} display="flex" gap={1}>
        <TextField
          label="Key"
          value={s.key}
          onChange={(e) =>
            setSpecifications(p =>
              p.map((x, idx) => idx === i ? { ...x, key: e.target.value } : x)
            )
          }
          fullWidth
        />
        <TextField
          label="Value"
          value={s.value}
          onChange={(e) =>
            setSpecifications(p =>
              p.map((x, idx) => idx === i ? { ...x, value: e.target.value } : x)
            )
          }
          fullWidth
        />
        <IconButton onClick={() => setSpecifications(p => p.filter((_, idx) => idx !== i))}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ))}

    <Button onClick={() => setSpecifications(p => [...p, { key: "", value: "" }])}>
      + Add Specification
    </Button>
  </>
);

export default SpecificationsSection;