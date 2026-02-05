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
  const walletRef = doc(db, "wallets", bidderId);
  const bidsRef = collection(db, "auction_bids");

  await runTransaction(db, async (tx) => {
    const productSnap = await tx.get(productRef);
    const walletSnap = await tx.get(walletRef);

    if (!productSnap.exists()) throw "Product not found";
    if (!walletSnap.exists()) throw "Wallet not found";

    const product = productSnap.data();
    const wallet = walletSnap.data();

    if (product.saleType !== "auction") throw "Not an auction";

    // auction must be live
    const now = new Date();
    const start = product.auction.startTime.toDate();
    const end = product.auction.endTime.toDate();
    if (now < start || now > end) throw "Auction not live";

    const minBid =
      product.auction.highestBid +
      product.auction.minBidIncrement;

    if (bidAmount < minBid) throw "Bid too low";

    const available =
      wallet.balance - wallet.lockedAmount;

    if (available < bidAmount)
      throw "Insufficient balance";

    // unlock previous highest bidder
    if (product.auction.highestBidderId) {
      const prevWalletRef = doc(
        db,
        "wallets",
        product.auction.highestBidderId
      );

      tx.update(prevWalletRef, {
        lockedAmount:
          wallet.lockedAmount - product.auction.highestBid
      });
    }

    // lock new bidder amount
    tx.update(walletRef, {
      lockedAmount: wallet.lockedAmount + bidAmount
    });

    // update product auction
    tx.update(productRef, {
      "auction.highestBid": bidAmount,
      "auction.highestBidderId": bidderId,
      "auction.bidCount": product.auction.bidCount + 1,
      updatedAt: serverTimestamp()
    });

    // record bid
    tx.add(bidsRef, {
      productId,
      bidderId,
      bidAmount,
      status: "active",
      createdAt: serverTimestamp()
    });
  });
};
