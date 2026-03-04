// hooks/useAuctionCheckoutData.js
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const useAuctionCheckoutData = (productId, currentUser) => {
  const [product, setProduct]         = useState(null);
  const [auction, setAuction]         = useState(null);
  const [pageStatus, setPageStatus]   = useState("loading");
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "", email: "", phone: "",
    address: "", city: "", zip: "", state: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) { setPageStatus("not-winner"); return; }

      try {
        const productSnap = await getDoc(doc(db, "products", productId));
        if (!productSnap.exists()) { setPageStatus("not-found"); return; }

        const productData = { ...productSnap.data(), id: productSnap.id };
        const auctionData = productData.auction;

        setProduct(productData);
        setAuction(auctionData);

        // Guard checks in priority order
        if (currentUser.uid !== auctionData?.highestBidderId) { setPageStatus("not-winner"); return; }
        if (auctionData?.paymentStatus === "paid")            { setPageStatus("paid");        return; }
        if (auctionData?.paymentStatus === "expired")         { setPageStatus("expired");     return; }
        if (auctionData?.status !== "ended")                  { setPageStatus("not-ended");   return; }

        // Pre-fill shipping details from user's Firestore profile
        const userSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (userSnap.exists()) {
          const u = userSnap.data();
          setDeliveryDetails({
            fullName: u.fullName              || "",
            email:    u.email                 || currentUser.email || "",
            phone:    u.phone                 || "",
            address:  u.address               || u.business?.address || "",
            city:     u.city                  || u.business?.city    || "",
            zip:      u.zip                   || "",
            state:    u.state                 || "",
          });
        }

        setPageStatus("valid");
      } catch (err) {
        console.error("AuctionCheckout fetch error:", err);
        setPageStatus("error");
      }
    };

    fetchData();
  }, [productId, currentUser]);

  return { product, auction, pageStatus, setPageStatus, deliveryDetails, setDeliveryDetails };
};

export default useAuctionCheckoutData;