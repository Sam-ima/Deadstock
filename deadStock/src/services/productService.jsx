import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const productRef = collection(db, "products");

/* CREATE */
export const addProduct = async (productData) => {
  return await addDoc(productRef, {
    ...productData,
    createdAt: serverTimestamp(),
  });
};

/* READ */
export const getAllProducts = async () => {
  const snapshot = await getDocs(productRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* UPDATE */
export const updateProductPrice = async (id, newPrice) => {
  const productDoc = doc(db, "products", id);
  return await updateDoc(productDoc, {
    currentPrice: newPrice,
  });
};

/* DELETE */
export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  return await deleteDoc(productDoc);
};
