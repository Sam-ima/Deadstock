import { Card } from "@mui/material";

const sectionCard = ({ children }) => {
  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "background.paper",
      }}
    >
      {children}
    </Card>
  );
};

export default sectionCard;
