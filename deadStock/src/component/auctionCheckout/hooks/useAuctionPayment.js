// hooks/useAuctionEsewaPayment.js
import { toast } from "react-toastify";

const REQUIRED_ESEWA_FIELDS = [
  "amount", "tax_amount", "total_amount", "transaction_uuid",
  "product_code", "product_service_charge", "product_delivery_charge",
  "success_url", "failure_url", "signed_field_names", "signature",
];

const useAuctionEsewaPayment = ({ product, auction, currentUser, deliveryDetails, setPlacing }) => {

  const isDeliveryDetailsComplete = () =>
    ["fullName", "email", "phone", "address", "city"].every(
      (k) => deliveryDetails[k]?.trim()
    );

  const extractPaymentData = (responseData) => {
    if (responseData.payload) return responseData.payload;
    if (responseData.success === true || responseData.success === false) {
      const data = { ...responseData };
      delete data.success;
      delete data.message;
      return data;
    }
    return responseData;
  };

  const submitEsewaForm = (paymentData) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    form.style.display = "none";
    form.id = "esewaAuctionForm";

    // Required fields
    REQUIRED_ESEWA_FIELDS.forEach((field) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = field;
      input.value = paymentData[field];
      form.appendChild(input);
    });

    // Any extra fields from backend
    Object.keys(paymentData)
      .filter((f) => !REQUIRED_ESEWA_FIELDS.includes(f) && f !== "success" && f !== "message")
      .forEach((field) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = field;
        input.value = paymentData[field];
        form.appendChild(input);
      });

    document.body.appendChild(form);
    setTimeout(() => form.submit(), 2000);
  };

  const handleEsewaPayment = async () => {
    if (!isDeliveryDetailsComplete()) {
      toast.error("Please fill all delivery details before making payment.");
      return;
    }

    setPlacing(true);

    try {
      const auctionItem = {
        productId: product.id,
        name:      product.name,
        price:     auction.highestBid,
        quantity:  1,
        isAuction: true,
        sellerId:  product.sellerId,
        image:     product.images?.find((i) => i.isMain)?.url || product.images?.[0]?.url || "",
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/esewa/initiate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId:           currentUser.uid,
            userEmail:        currentUser.email,
            items:            [auctionItem],
            totalAmount:      Math.round(auction.highestBid),
            deliveryDetails,
            isAuctionOrder:   true,
            auctionProductId: product.id,
          }),
        }
      );

      const responseText = await res.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        toast.error("Invalid response from payment server");
        setPlacing(false);
        return;
      }

      if (!res.ok) {
        toast.error(responseData.error || "Unable to initiate payment");
        setPlacing(false);
        return;
      }

      const paymentData = extractPaymentData(responseData);

      // Validate all required fields are present
      const missingFields = REQUIRED_ESEWA_FIELDS.filter(
        (f) => paymentData[f] === undefined || paymentData[f] === null || paymentData[f] === ""
      );

      if (missingFields.length > 0) {
        toast.error(`Payment config incomplete. Missing: ${missingFields.join(", ")}`);
        setPlacing(false);
        return;
      }

      toast.info("Redirecting to eSewa...");
      submitEsewaForm(paymentData);

    } catch (err) {
      console.error("Auction eSewa payment error:", err);
      toast.error("Failed to process payment. Please try again.");
      setPlacing(false);
    }
  };

  return { handleEsewaPayment, isDeliveryDetailsComplete };
};

export default useAuctionEsewaPayment;