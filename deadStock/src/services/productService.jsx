import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  getDocs,
  doc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { uploadProductImage } from "./storageService";

const productsRef = collection(db, "products");

/* ---------------- CREATE PRODUCT ---------------- */
export const addProduct = async ({
  productData,
  images,
  customFields,
  sellerId,
}) => {
  const dynamicData = {};

  customFields.forEach(({ key, value }) => {
    if (key && key.trim()) {
      dynamicData[key.trim()] = value;
    }
  });

  const docRef = await addDoc(productsRef, {
    ...productData,
    ...dynamicData,
    sellerId,
    images: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const imageUrls = [];

  for (const img of images) {
    const url = await uploadProductImage(img.file, sellerId, docRef.id);
    imageUrls.push(url);
  }

  await updateDoc(doc(db, "products", docRef.id), {
    images: imageUrls,
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

/* ---------------- READ ALL PRODUCTS ---------------- */
export const getAllProducts = async () => {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ---------------- DELETE PRODUCT ---------------- */
export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};
