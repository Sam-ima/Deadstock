import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { resolveAuctionStatus } from "./productService"; // adjust path

const productsRef = collection(db, "products");

/**
 * Sync ALL auction statuses based on time
 * scheduled → live → ended
 */
export const syncAllAuctionStatuses = async () => {
  try {
    // Only auction products
    const q = query(productsRef, where("saleType", "==", "auction"));
    const snapshot = await getDocs(q);

    const updates = [];

    snapshot.forEach((docSnap) => {
      const product = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      if (!product.auction) return;

      const newStatus = resolveAuctionStatus(product);
      const currentStatus = product.auction.status;

      // Skip if no change
      if (newStatus === currentStatus) return;

      const productRef = doc(db, "products", product.id);

      const updateData = {
        "auction.status": newStatus,
        updatedAt: serverTimestamp(),
      };

      // ✅ REQUIREMENT: enable depreciation when auction ends
      if (newStatus === "ended") {
        updateData.isDepreciating = true;
        updateData.saleType = "direct";
      }

      updates.push(updateDoc(productRef, updateData));
    });

    await Promise.all(updates);

    console.log("Auction status sync completed");
  } catch (error) {
    console.error("Auction sync failed:", error);
  }
};

export const fixEndedAuctions = async () => {
  try {
    const q = query(
      productsRef,
      where("saleType", "==", "auction"),
      where("auction.status", "==", "ended")
    );
    const snapshot = await getDocs(q);

    const updates = snapshot.docs.map((docSnap) =>
      updateDoc(doc(db, "products", docSnap.id), {
        saleType: "direct",
        isDepreciating: true,
        updatedAt: serverTimestamp(),
      })
    );

    await Promise.all(updates);
    console.log(`Fixed ${snapshot.docs.length} stuck auction(s)`);
  } catch (error) {
    console.error("Fix failed:", error);
  }
};