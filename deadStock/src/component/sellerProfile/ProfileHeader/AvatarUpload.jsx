import { useState } from "react";
import { Box, IconButton, CircularProgress, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { uploadToCloudinary } from "../../../services/cloudinaryService";

const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

const getAvatarColor = (name = "") => {
  const colors = [
    "#3d7284",
    "#51406c",
    "#db2777",
    "#dc2626",
    "#d97706",
    "#16a34a",
    "#0891b2",
    "#ea580c",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const AvatarUploader = ({ buyer, avatar, setAvatar }) => {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
    setLoading(true);
    try {
      const uploaded = await uploadToCloudinary(file);
      await updateDoc(doc(db, "users", buyer.uid), {
        photoURL: uploaded.secure_url,
      });
      setAvatar(uploaded.secure_url);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <Box position="relative" display="inline-block">
      {avatar ? (
        <Avatar
          src={avatar}
          alt={buyer.fullName}
          sx={{ width: 100, height: 100, fontSize: 36, fontWeight: 700 }}
        />
      ) : (
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: getAvatarColor(buyer.fullName),
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          {getInitials(buyer.fullName)}
        </Avatar>
      )}

      <input
        id="avatar-upload"
        type="file"
        hidden
        onChange={handleImageChange}
      />
      <IconButton
        component="label"
        htmlFor="avatar-upload"
        sx={{
          position: "absolute",
          bottom: 6,
          right: 6,
          bgcolor: "#22C55E",
          "&:hover": { bgcolor: "#16a34a" },
        }}
      >
        {loading ? (
          <CircularProgress size={18} sx={{ color: "#fff" }} />
        ) : (
          <EditIcon sx={{ fontSize: 18, color: "#fff" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default AvatarUploader;
