import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { uploadProfileImage } from "../../context/authContext/authServices";

const ProfileHeader = ({ seller }) => {
  const [avatar, setAvatar] = useState(seller.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔥 instant preview
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);

    try {
      setLoading(true);
      const url = await uploadProfileImage(file, seller.uid);
      setAvatar(url); // final firebase URL
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      textAlign="center"
      mt={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box position="relative">
        <Avatar
          src={avatar}
          sx={{
            width: 120,
            height: 120,
            border: "4px solid #22C55E",
          }}
        />

        <IconButton
          component="label"
          disabled={loading}
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            bgcolor: "#FF7A00",
            color: "#fff",
            "&:hover": { bgcolor: "#e66a00" },
          }}
        >
          <EditIcon fontSize="small" />
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </IconButton>
      </Box>

      <Typography variant="h5" fontWeight={700} mt={2}>
        {seller.fullName}
      </Typography>

      <Typography color="text.secondary">
        {seller.shopName || seller.email}
      </Typography>

      <Chip label="VERIFIED SELLER" color="success" sx={{ mt: 1, px: 2 }} />

      <Box display="flex" justifyContent="space-around" mt={3} width="100%">
        <Box textAlign="center">
          <Typography fontWeight={700}>0</Typography>
          <Typography variant="caption">Selling</Typography>
        </Box>
        <Box textAlign="center">
          <Typography fontWeight={700}>0</Typography>
          <Typography variant="caption">Sold</Typography>
        </Box>
        <Box textAlign="center">
          <Typography fontWeight={700}>5.0</Typography>
          <Typography variant="caption">Rating</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
