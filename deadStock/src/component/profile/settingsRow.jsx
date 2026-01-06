import { ListItemButton, ListItemText } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SettingsRow = ({ onClick }) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemText primary="Settings" />
      <ChevronRightIcon />
    </ListItemButton>
  );
};

export default SettingsRow;
