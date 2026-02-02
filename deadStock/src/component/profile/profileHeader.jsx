import { useState } from "react";
import { Avatar, Box, Typography, Chip, IconButton, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { uploadToCloudinary } from "../../services/cloudinaryService";

const BuyerHeader = ({ buyer }) => {
  if (!buyer) return null;

  const [avatar, setAvatar] = useState(buyer.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔹 Local preview
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);

    try {
      setLoading(true);

      // 🔹 Upload to Cloudinary
      const uploaded = await uploadToCloudinary(file);
      const imageUrl = uploaded.secure_url;

      // 🔹 Update Firestore
      const userRef = doc(db, "users", buyer.uid);
      await updateDoc(userRef, { photoURL: imageUrl });

      // 🔹 Final avatar
      setAvatar(imageUrl);
    } catch (error) {
      console.error("Profile image upload failed:", error);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <Box textAlign="center" mt={2}>
      <Box position="relative" display="inline-block">
        <Avatar
          src={avatar || "/avatar.png"}
          sx={{ width: 120, height: 120 }}
        />

        {/* Hidden file input */}
        <input
          id="buyer-avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
          }}
        />

        {/* Edit Button */}
        <IconButton
          component="label"
          htmlFor="buyer-avatar-upload"
          disabled={loading}
          sx={{
            position: "absolute",
            bottom: 6,
            right: 6,
            bgcolor: "#22C55E",
            color: "white",
            "&:hover": { bgcolor: "#16A34A" },
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            <EditIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      <Typography variant="h5" fontWeight={700} mt={2}>
        {buyer.fullName || "No Name"}
      </Typography>

      <Typography color="text.secondary">
        @{buyer.email?.split("@")[0] || "username"}
      </Typography>

      {buyer.role === "buyer" && (
        <Chip
          label={buyer.buyerType === "business" ? "BUSINESS BUYER" : "PERSONAL BUYER"}
          color="success"
          sx={{ mt: 2, px: 2 }}
        />
      )}

      {buyer.role === "seller" && (
        <Chip label="SELLER" color="primary" sx={{ mt: 2, px: 2 }} />
      )}
    </Box>
  );
};

export default BuyerHeader;