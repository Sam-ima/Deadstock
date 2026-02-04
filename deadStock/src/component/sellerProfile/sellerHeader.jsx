import { useState, useRef } from "react";
import { Avatar, Box, Typography, Chip, IconButton, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config"; // Firestore instance
import { uploadToCloudinary } from "../../services/cloudinaryService";

const ProfileHeader = ({ seller }) => {
  // State for avatar preview & loading
  const [avatar, setAvatar] = useState(seller.photoURL || "");
  const [loading, setLoading] = useState(false);

  // Ref for hidden file input
  const fileInputRef = useRef(null);

  // Function to handle file selection
  const handleEditClick = () => {
    console.log("Edit clicked"); // ✅ Should appear in console
    if (fileInputRef.current) {
      console.log("Input ref exists:", fileInputRef.current); // ✅ Should not be null
      fileInputRef.current.click();
    }
  };
  console.log("ProfileHeader mounted", seller.fullName);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);

    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);

    try {
      setLoading(true);
      const uploaded = await uploadToCloudinary(file);
      console.log("Uploaded result:", uploaded);

      const finalUrl = uploaded.secure_url;
      if (!seller.uid) throw new Error("seller.uid is missing");

      const sellerRef = doc(db, "users", seller.uid);
      await updateDoc(sellerRef, { photoURL: finalUrl });
      setAvatar(finalUrl);

    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
      e.target.value = "";
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
      {/* Avatar + Edit Button */}
      <Box position="relative" sx={{ display: "inline-block" }}>
        <Avatar
          src={avatar}
          sx={{ width: 120, height: 120, border: "4px solid #22C55E" }}
        />
        <IconButton
          onClick={handleEditClick}
          disabled={loading}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "#FF7A00",
            color: "#fff",
            "&:hover": { bgcolor: "#e66a00" },
            zIndex: 10, // Ensure button is above Avatar
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            <EditIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      {/* Seller Info */}
      <Typography variant="h5" fontWeight={700} mt={2}>
        {seller.fullName}
      </Typography>
      <Typography color="text.secondary">{seller.email}</Typography>
      <Chip label="VERIFIED SELLER" color="success" sx={{ mt: 1, px: 2 }} />

      {/* Stats */}
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