import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 as uuid } from "uuid";

export const uploadProductImage = async (file, sellerId, productId) => {
  const imageRef = ref(
    storage,
    `products/${sellerId}/${productId}/${uuid()}-${file.name}`
  );

  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};
