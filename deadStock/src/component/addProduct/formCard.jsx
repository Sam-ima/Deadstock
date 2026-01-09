import { Paper } from "@mui/material";

const FormCard = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      {children}
    </Paper>
  );
};

export default FormCard;
