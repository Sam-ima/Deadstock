import {
  Box,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";

const ITEM_HEIGHT = 36;
const VISIBLE_ITEMS = 6;

const DrawerNavItem = ({
  item,
  open,
  isActive,
  onToggle,
  onNavigate,
  onSubNavigate,
}) => {
  return (
    <Box>
      <ListItemButton
        onClick={() => (item.submenu ? onToggle() : onNavigate(item.path))}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          backgroundColor: isActive ? "rgba(20,90,67,0.12)" : "transparent",
        }}
      >
        <Box mr={1.5}>{item.icon}</Box>

        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontWeight: isActive ? 700 : 500,
          }}
        />

        {item.submenu &&
          (open ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
      </ListItemButton>

      {item.submenu && (
        <Collapse in={open}>
          <Box
            sx={{
              maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
              overflowY: "auto",
            }}
          >
            <List disablePadding>
              {item.submenu.map((cat) => {
                const label = cat.name || cat.label || cat;
                const slug =
                  cat.slug || label.toLowerCase().replace(/\s+/g, "-");

                return (
                  <ListItemButton
                    key={slug}
                    sx={{ pl: 5, height: ITEM_HEIGHT }}
                    onClick={() => onSubNavigate(slug)}
                  >
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{ fontSize: "0.9rem" }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default DrawerNavItem;
