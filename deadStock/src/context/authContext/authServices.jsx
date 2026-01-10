import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const googleProvider = new GoogleAuthProvider();

/* ================= EMAIL / PASSWORD SIGNUP ================= */

export const signupWithEmail = async (data) => {
  const {
    email,
    password,
    fullName,
    role,
    buyerType,
    shopName,
    phone,
    address,
    city,
    country,
    panVat,
  } = data;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  const userData = {
    uid: user.uid,
    email,
    fullName,
    role,
    buyerType: role === "buyer" ? buyerType : null, // track buyer type
    provider: "password",
    photoURL: "",
    createdAt: new Date(),
  };

  // Add business info if:
  // 1. Seller
  // 2. Buyer with business type
  if (role === "seller" || (role === "buyer" && buyerType === "business")) {
    userData.business = {
      shopName,
      phone,
      address,
      city,
      country,
      panVat,
    };
  }

  await setDoc(doc(db, "users", user.uid), userData);

  return user;
};


/* ================= EMAIL LOGIN ================= */

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

/* ================= GOOGLE LOGIN ================= */

export const loginWithGoogle = async (role = "buyer") => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  // Create document only first time
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName,
      role,
      provider: "google",
      photoURL: user.photoURL || "",
      createdAt: new Date(),
    });
  }

  return user;
};

/* ================= PROFILE IMAGE UPLOAD ================= */

export const uploadProfileImage = async (file, uid) => {
  const imageRef = ref(storage, `users/${uid}`);

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  await updateDoc(doc(db, "users", uid), {
    photoURL: url,
  });

  return url;
};
