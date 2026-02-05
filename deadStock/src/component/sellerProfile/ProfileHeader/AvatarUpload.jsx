import { useState } from "react";
import { Box, IconButton, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { uploadToCloudinary } from "../../../services/cloudinaryService";

/* ================= Avatar Uploader ================= */
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
      <img
        src={avatar || "/avatar.png"}
        alt="Avatar"
        style={{ width: 120, height: 120, borderRadius: "50%" }}
      />
      <input
        id="avatar-upload"
        type="file"
        hidden
        onChange={handleImageChange}
      />
      <IconButton
        component="label"
        htmlFor="avatar-upload"
        sx={{ position: "absolute", bottom: 6, right: 6, bgcolor: "#22C55E" }}
      >
        {loading ? <CircularProgress size={18} /> : <EditIcon />}
      </IconButton>
    </Box>
  );
};

export default AvatarUploader;
