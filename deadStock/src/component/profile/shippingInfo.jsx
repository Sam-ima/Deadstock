import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SectionCard from "../../common/sectionCard";

const ShippingInfo = () => {
  return (
    <>
      <Typography variant="h6" mb={1}>
        Shipping
      </Typography>
      <SectionCard>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary="Primary Address"
              secondary="123 Sneaker St, Apt 4B, New York"
            />
          </ListItem>
        </List>
      </SectionCard>
    </>
  );
};

export default ShippingInfo;
