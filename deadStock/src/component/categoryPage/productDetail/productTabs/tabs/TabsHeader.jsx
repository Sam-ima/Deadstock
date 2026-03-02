// src/pages/product/components/tabs/TabsHeader.jsx
import { useEffect, useState } from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { CheckCircle, Verified, Star, ThumbUp } from "@mui/icons-material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";

const TabsHeader = ({ product, tabValue, setTabValue }) => {
  const [reviewCount, setReviewCount] = useState(product?.reviews || 0);

  useEffect(() => {
    if (!product?.id) return;

    const q = query(
      collection(db, "reviews"),
      where("productId", "==", product.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviewCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [product?.id]);

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
      <Tabs
        value={tabValue}
        onChange={(e, v) => setTabValue(v)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<CheckCircle />} label="Description" />
        {product.specifications && <Tab icon={<Verified />} label="Specifications" />}
        {product.features && <Tab icon={<Star />} label="Features" />}
        <Tab icon={<ThumbUp />} label={`Reviews (${reviewCount})`} />
      </Tabs>
    </Paper>
  );
};

export default TabsHeader;