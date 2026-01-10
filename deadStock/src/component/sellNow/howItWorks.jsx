import { Box, Typography, Grid, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PaymentsIcon from "@mui/icons-material/Payments";

const steps = [
  {
    icon: <PersonIcon />,
    title: "Create Account",
    desc: "Choose Individual or Business for personal or bulk selling.",
  },
  {
    icon: <ListAltIcon />,
    title: "List Your Item",
    desc: "Add photos, description, and select selling method.",
  },
  {
    icon: <PaymentsIcon />,
    title: "Get Paid",
    desc: "Ship items and receive payment upon delivery.",
  },
];

const HowItWorks = () => {
  return (
    <Box  sx={{py:{ xs:4 , sm:5 , md:6}}}
    textAlign="center">
      <Typography variant="h5" fontWeight={700} mb={5}>
        How it works
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Avatar
              sx={{
                bgcolor: "#E8F5E9",
                color: "#1DE96B",
                mx: "auto",
                mb: 2,
                width: 56,
                height: 56,
              }}
            >
              {step.icon}
            </Avatar>
            <Typography fontWeight={700}>{step.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {step.desc}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
