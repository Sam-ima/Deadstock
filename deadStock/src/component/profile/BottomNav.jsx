import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";

export default function BottomNav() {
  const [value, setValue] = useState(1);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(e, v) => setValue(v)}
        showLabels
      >
        <BottomNavigationAction icon={<GridViewIcon />} />
        <BottomNavigationAction icon={<InventoryIcon />} />
        <BottomNavigationAction icon={<PaymentsIcon />} />
        <BottomNavigationAction icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
