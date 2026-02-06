import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const SaveActions = ({ onSave }) => (
  <Box mt={2} textAlign="right">
    <Button
      variant="contained"
      color="success"
      startIcon={<SaveIcon />}
      onClick={onSave}
    >
      Save Changes
    </Button>
  </Box>
);

export default SaveActions;
