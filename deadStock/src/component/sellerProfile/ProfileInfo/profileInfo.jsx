import { Box, List } from "@mui/material";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebase";

import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";
import SaveActions from "./SaveActions";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";

const ProfileInfo = ({ buyer }) => {
  const [editing, setEditing] = useState({
    personal: false,
    business: false,
    shipping: false,
  });

  const [formData, setFormData] = useState({ ...buyer });

  const isBusinessUser =
    buyer.role === "seller" ||
    buyer.role === "both" ||
    (buyer.role === "buyer" && buyer.buyerType === "business");

  const showShipping = Boolean(buyer.address);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("business.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        business: { ...prev.business, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const saveSection = async (section) => {
    try {
      await updateDoc(doc(db, "users", buyer.uid), formData);
      Object.assign(buyer, formData);

      setEditing((p) => ({ ...p, [section]: false }));
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Box mt={3}>
      {/* PERSONAL */}
      <ProfileSection
        title="Personal Info"
        isEditing={editing.personal}
        onEditToggle={() =>
          setEditing((p) => ({ ...p, personal: !p.personal }))
        }
      >
        <List disablePadding>
          <ProfileField
            icon={<EmailIcon color="warning" />}
            label="Email"
            name="email"
            value={formData.email}
            isEditing={editing.personal}
            onChange={handleChange}
          />

          <ProfileField
            icon={<PhoneIcon color="warning" />}
            label="Phone"
            name="phone"
            value={formData.phone}
            isEditing={editing.personal}
            onChange={handleChange}
          />

          {isBusinessUser && (
            <>
              <ProfileField
                icon={<StoreIcon color="warning" />}
                label="Shop Name"
                name="shopName"
                value={formData.shopName}
                isEditing={editing.personal}
                onChange={handleChange}
              />

              <ProfileField
                icon={<BadgeIcon color="warning" />}
                label="PAN / VAT"
                name="panVat"
                value={formData.panVat}
                isEditing={editing.personal}
                onChange={handleChange}
              />
            </>
          )}

          {editing.personal && (
            <SaveActions onSave={() => saveSection("personal")} />
          )}
        </List>
      </ProfileSection>

      {/* BUSINESS */}
      {isBusinessUser && buyer.business && (
        <ProfileSection
          title="Business Info"
          isEditing={editing.business}
          onEditToggle={() =>
            setEditing((p) => ({ ...p, business: !p.business }))
          }
        >
          <List  >
            {["phone", "address", "city", "country","panVat"].map((f) => (
              <ProfileField
                key={f}
                label={f}
                name={`business.${f}`}
                value={formData.business?.[f]}
                isEditing={editing.business}
                onChange={handleChange}
              />
            ))}

            {editing.business && (
              <SaveActions onSave={() => saveSection("business")} />
            )}
          </List>
        </ProfileSection>
      )}

      {/* SHIPPING */}
      {showShipping && (
        <ProfileSection
          title="Shipping Address"
          isEditing={editing.shipping}
          onEditToggle={() =>
            setEditing((p) => ({ ...p, shipping: !p.shipping }))
          }
        >
          <List>
            {["address", "city", "country"].map((f) => (
              <ProfileField
                key={f}
                label={f}
                name={f}
                value={formData[f]}
                isEditing={editing.shipping}
                onChange={handleChange}
              />
            ))}

            {editing.shipping && (
              <SaveActions onSave={() => saveSection("shipping")} />
            )}
          </List>
        </ProfileSection>
      )}
    </Box>
  );
};

export default ProfileInfo;
