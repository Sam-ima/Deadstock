import { Card } from "@mui/material";

const sectionCard = ({ children }) => {
  return (
    <Card
      sx={{
        borderRadius: 6,
        hover: { boxShadow: 6 },
        hovercolor: "green",
        color: "text.primary",
        m: 2,
        p: 2,

        backgroundColor: "white",
      }}
    >
      {children}
    </Card>
  );
};

export default sectionCard;
