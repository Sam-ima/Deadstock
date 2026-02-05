import { Drawer, Box } from "@mui/material";
import DrawerNavList from "./DrawerNavList";
import DrawerAuthSection from "./DrawerAuthSection";

const MobileDrawer = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        width={280}
        height="100%"
        bgcolor="#f9f9f9"
        display="flex"
        flexDirection="column"
      >
        <DrawerNavList onClose={onClose} />
        <DrawerAuthSection onClose={onClose} />
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
