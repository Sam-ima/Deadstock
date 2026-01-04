import { Box } from "@mui/material";
import { letterReveal } from "./animations";

const AnimatedLetters = ({ text, delay = 0, duration = 0.6 }) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <Box
          key={index}
          component="span"
          sx={{
             color:"#180606ff",
            display: "inline-block",
            whiteSpace: "pre",
            opacity: 0,
            animation: `${letterReveal} ${duration}s ease-out forwards`,
            animationDelay: `${delay + index * 0.04}s`,
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
              lg: "3.5rem",
            },
          }}
        >
          {char}
        </Box>
      ))}
    </>
  );
};

export default AnimatedLetters;
