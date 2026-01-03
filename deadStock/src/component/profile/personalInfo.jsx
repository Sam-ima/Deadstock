import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SectionCard from "../../common/sectionCard";

const PersonalInfo = () => {
  return (
    <>
      <Typography variant="h6" mb={1}>
        Personal Info
      </Typography>
      <SectionCard>
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="j.smith@example.com" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary="+1 (555) 000-0000" />
          </ListItem>
        </List>
      </SectionCard>
    </>
  );
};

export default PersonalInfo;
