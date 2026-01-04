import { Card } from "@mui/material";

const SectionCard = ({ children }) => {
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

export default SectionCard;
