import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1.5, 0),
}));

const ProfileInfo = ({ title, items, noDivider }) => {
  return (
    <SectionContainer>
      <SectionTitle variant="subtitle1">{title}</SectionTitle>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <InfoItem>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              {item.value && (
                <Typography variant="body1">{item.value}</Typography>
              )}
            </Box>
            {item.icon && (
              <Typography variant="body2" color="text.secondary">
                {item.icon}
              </Typography>
            )}
          </InfoItem>
          {!noDivider && index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </SectionContainer>
  );
};

export default ProfileInfo;
