import { ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";

const formatLabel = (label) =>
  label
    .replace(/([A-Z])/g, " $1")      // panVat → pan Vat
    .replace(/^./, (c) => c.toUpperCase()); // capitalize first letter

const ProfileField = ({ icon, label, name, value, isEditing, onChange }) => {
  const displayLabel = formatLabel(label);

  return (
    <ListItem disableGutters>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}

      {isEditing ? (
        <TextField
          fullWidth
          size="small"
          label={displayLabel}
          name={name}
          value={value || ""}
          onChange={onChange}
        />
      ) : (
        <ListItemText
          primary={displayLabel}
          secondary={value || "Not Provided"}
        />
      )}
    </ListItem>
  );
};

export default ProfileField;
