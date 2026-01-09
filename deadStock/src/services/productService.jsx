import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { uploadProductImage } from "./storageService";

const productsRef = collection(db, "products");

export const addProduct = async ({
  productData,
  images,
  customFields,
  sellerId,
}) => {
  // 1️⃣ Convert dynamic fields to object
  const dynamicData = {};
  customFields.forEach(({ key, value }) => {
    if (key.trim()) dynamicData[key] = value;
  });

  // 2️⃣ Create product first
  const docRef = await addDoc(productsRef, {
    ...productData,
    ...dynamicData, // 🔥 dynamic fields here
    sellerId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // 3️⃣ Upload images
  const imageUrls = [];
  for (const img of images) {
    const url = await uploadProductImage(
      img.file,
      sellerId,
      docRef.id
    );
    imageUrls.push(url);
  }

  // 4️⃣ Update product with images
  await addDoc(productsRef, {
    images: imageUrls,
  });

  return docRef.id;
};
