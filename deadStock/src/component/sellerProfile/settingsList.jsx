import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

const RowItem = ({ label, value, name, isEditing, onChange }) => (
  <Stack spacing={0.5}>
    <Typography fontSize={13} color="text.secondary">
      {label}
    </Typography>

    {isEditing ? (
      <TextField size="small" name={name} value={value} onChange={onChange} />
    ) : (
      <Typography fontWeight={500}>{value || "—"}</Typography>
    )}
  </Stack>
);

const SettingsList = ({ seller }) => {
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    shopName: seller.shopName || "",
    phone: seller.phone || "",
    address: seller.address || "",
    city: seller.city || "",
    country: seller.country || "",
    panVat: seller.panVat || "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", seller.uid), formData);
      toast.success("Profile updated");
      setEdit(false);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Box mx="auto" mt={6}>
      {/* HEADER */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Account Settings
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Manage your business information
        </Typography>
      </Box>

      {/* MAIN LAYOUT */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* RIGHT COLUMN */}
        <Paper
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 4,
            // boxShadow: "0px 12px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* TITLE */}
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            mb={3}
          >
            {!edit && (
              <Button
                startIcon={<EditIcon />}
                onClick={() => setEdit(true)}
                sx={{ textTransform: "none",color:"orange" }}
              >
                Edit
              </Button>
            )}
          </Stack>

          {/* CONTENT */}
          <Stack spacing={3}>
            <RowItem
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              isEditing={edit}
              onChange={handleChange}
            />
            <Divider sx={{ mb: 3 }} />

            <RowItem
              label="Phone Number"
              name="phone"
              value={formData.phone}
              isEditing={edit}
              onChange={handleChange}
            />
            <Divider sx={{ mb: 3 }} />

            <RowItem
              label="PAN / VAT"
              name="panVat"
              value={formData.panVat}
              isEditing={edit}
              onChange={handleChange}
            />
            <Divider sx={{ mb: 3 }} />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <RowItem
                label="Address"
                name="address"
                value={formData.address}
                isEditing={edit}
                onChange={handleChange}
              />
              <RowItem
                label="City"
                name="city"
                value={formData.city}
                isEditing={edit}
                onChange={handleChange}
              />
              <RowItem
                label="Country"
                name="country"
                value={formData.country}
                isEditing={edit}
                onChange={handleChange}
              />
            </Stack>
          </Stack>

          {/* ACTIONS */}
          {edit && (
            <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
              <Button onClick={() => setEdit(false)} sx={{ color: "red" }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#eab76a",
                  px: 4,
                  "&:hover": { bgcolor: "#306960" },
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Stack>
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default SettingsList;
