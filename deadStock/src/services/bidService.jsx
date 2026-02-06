import {
  doc,
  runTransaction,
  serverTimestamp,
  collection
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const placeBid = async ({
  productId,
  bidderId,
  bidAmount
}) => {
  const productRef = doc(db, "products", productId);
  const bidsRef = collection(db, "auction_bids");

  await runTransaction(db, async (tx) => {
    const productSnap = await tx.get(productRef);

    if (!productSnap.exists()) {
      throw "Product not found";
    }

    const product = productSnap.data();

    if (product.saleType !== "auction") {
      throw "Not an auction";
    }

    // Auction must be live
    const now = new Date();
    const start = product.auction.startTime.toDate();
    const end = product.auction.endTime.toDate();

    if (now < start || now > end) {
      throw "Auction not live";
    }

    const minBid =
      product.auction.highestBid +
      product.auction.minBidIncrement;

    if (bidAmount < minBid) {
      throw "Bid too low";
    }

    // Update auction data
    tx.update(productRef, {
      "auction.highestBid": bidAmount,
      "auction.highestBidderId": bidderId,
      "auction.bidCount": (product.auction.bidCount || 0) + 1,
      updatedAt: serverTimestamp()
    });

    // Record bid
    tx.add(bidsRef, {
      productId,
      bidderId,
      bidAmount,
      status: "active",
      createdAt: serverTimestamp()
    });
  });
};
