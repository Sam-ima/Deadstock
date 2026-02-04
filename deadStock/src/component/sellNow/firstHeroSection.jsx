import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import SellerContractDialog from "./SellerContractDialog";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [openContract, setOpenContract] = useState(false);
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ----------------------------------------
     SELL BUTTON
  ---------------------------------------- */
  const handleSellNow = () => {
    if (!user) {
      toast.error("Please register or log in to add items for sale.");
      return;
    }

    if (user.role !== "seller") {
      toast.error("Only sellers can list products.");
      return;
    }

    setOpenContract(true);
  };

  /* ----------------------------------------
     CONTRACT ACCEPT
  ---------------------------------------- */
  const handleAgreeContract = async () => {
    if (!signature.trim()) {
      toast.error("Please enter your name as signature.");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the selling contract.");
      return;
    }

    setSaving(true);

    try {
      await addDoc(collection(db, "contract"), {
        sellerId: user.uid,
        signatureName: signature,
        agreed: true,
        contractDate: serverTimestamp(),
      });

      toast.success("Contract accepted successfully ✅");
      setOpenContract(false);
      navigate("/sell-item");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save contract. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 3, sm: 4, md: 5 },
          px: 2,
        }}
      >
        <Typography
          fontWeight={700}
          color="#bd6213ff"
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "32px",
              lg: "40px",
              xl: "48px",
            },
          }}
        >
          Selling Made{" "}
          <Box component="span" color="#0B2A1E">
            Simple
          </Box>
        </Typography>

        <Typography
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 2,
            opacity: 0.9,
            fontSize: { xs: "16px", md: "18px", xl: "20px" },
          }}
        >
          Turn your deadstock into cash in just a few steps. Whether you're an
          individual or a business, we make it easy to clear your inventory.
        </Typography>

        <Button
          onClick={handleSellNow}
          size="large"
          sx={{
            mt: { xs: 3, md: 4 },
            px: { xs: 3, md: 4 },
            py: { xs: 1.2, md: 1.4 },
            borderRadius: 6,
            bgcolor: "#10562bff",
            color: "#fff",
            fontWeight: 600,
            "&:hover": { bgcolor: "#EF6C00", color: "#000" },
          }}
        >
          Sell Now
        </Button>
      </Box>

      <SellerContractDialog
        open={openContract}
        onClose={() => setOpenContract(false)}
        onAgree={handleAgreeContract}
        signature={signature}
        setSignature={setSignature}
        agreed={agreed}
        setAgreed={setAgreed}
        saving={saving}
      />
    </>
  );
};

export default HeroSection;
