import { useState } from "react";
import {
  Box,
  Typography
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
// import { uploadToCloudinary } from "../../services/cloudinaryService";
import { toast } from "react-toastify";
import AvatarUploader from "./AvatarUpload";
import RoleBadge from "./RoleBadge";
import BusinessDialog from "./BusinessDialog";
import RoleUpgradeCard from "./RoleUpgradeCard";

const BuyerHeader = ({ buyer }) => {
  if (!buyer) return null;

  const [avatar, setAvatar] = useState(buyer.photoURL || "");
  const [open, setOpen] = useState(false);
  const [business, setBusiness] = useState({
    shopName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    panVat: "",
  });

  const handleRoleUpdate = async () => {
    const ref = doc(db, "users", buyer.uid);

    // SELLER → BUYER
    if (buyer.role === "seller") {
      await updateDoc(ref, {
        role: "both",
        buyerType: "business",
        updatedAt: serverTimestamp(),
      });
      toast.success("You are now Buyer & Seller");
      return;
    }

    // BUYER → SELLER
    if (buyer.role === "buyer") {
      if (buyer.buyerType === "business") {
        await updateDoc(ref, {
          role: "both",
          updatedAt: serverTimestamp(),
        });
        toast.success("You are now Buyer & Seller");
      } else {
        setOpen(true); // collect business info
      }
    }
  };

  const handleSaveBusiness = async () => {
    const ref = doc(db, "users", buyer.uid);

    await updateDoc(ref, {
      role: "both",
      buyerType: "business",
      business,
      updatedAt: serverTimestamp(),
    });

    toast.success("Seller account activated 🎉");
    setOpen(false);
  };

  return (
    <Box textAlign="center" mt={2}>
      <AvatarUploader buyer={buyer} avatar={avatar} setAvatar={setAvatar} />
      <Typography variant="h5" mt={2} fontWeight={700}>
        {buyer.fullName}
      </Typography>
      <RoleBadge buyer={buyer} />
      <RoleUpgradeCard buyer={buyer} onActivate={handleRoleUpdate} />
      <BusinessDialog
        open={open}
        setOpen={setOpen}
        buyer={buyer}
        business={business}
        setBusiness={setBusiness}
        onSave={handleSaveBusiness}
      />
    </Box>
  );
};

export default BuyerHeader