import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import AvatarUploader from "./AvatarUpload";
import RoleBadge from "./RoleBadge";
import BusinessDialog from "./BusinessDialog";
import RoleUpgradeCard from "./RoleUpgradeCard";

const ProfileHeaderMain = ({ buyer }) => {
  // Local state to immediately reflect role changes
  const [localBuyer, setLocalBuyer] = useState(buyer);
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

  useEffect(() => {
    setLocalBuyer(buyer); // Update localBuyer if props change
  }, [buyer]);

  const handleRoleUpdate = async () => {
    const ref = doc(db, "users", buyer.uid);

    // SELLER → BUYER
    if (localBuyer.role === "seller") {
      await updateDoc(ref, {
        role: "both",
        buyerType: "business",
        updatedAt: serverTimestamp(),
      });
      setLocalBuyer({ ...localBuyer, role: "both", buyerType: "business" });
      toast.success("You are now Buyer & Seller");
      return;
    }

    // BUYER → SELLER
    if (localBuyer.role === "buyer") {
      if (localBuyer.buyerType === "business") {
        await updateDoc(ref, {
          role: "both",
          updatedAt: serverTimestamp(),
        });
        setLocalBuyer({ ...localBuyer, role: "both" });
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

    setLocalBuyer({
      ...localBuyer,
      role: "both",
      buyerType: "business",
      business,
    });

    toast.success("Seller account activated 🎉");
    setOpen(false);
  };

  return (
    <Box textAlign="center" mt={6}>
      <AvatarUploader buyer={buyer} avatar={avatar} setAvatar={setAvatar} />
      <Typography variant="h5" mt={2} fontWeight={700}>
        {buyer.fullName}
      </Typography>
      <RoleBadge buyer={localBuyer} />
      <RoleUpgradeCard buyer={localBuyer} onActivate={handleRoleUpdate} />
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

export default ProfileHeaderMain;
