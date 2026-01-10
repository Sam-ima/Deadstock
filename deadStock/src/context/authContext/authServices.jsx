import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const googleProvider = new GoogleAuthProvider();

/* ================= EMAIL / PASSWORD ================= */

export const signupWithEmail = async (data) => {
  const {
    email,
    password,
    fullName,
    role,
    shopName,
    phone,
    address,
    city,
    country,
    panVat,
  } = data;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    fullName,
    role,
    shopName,
    phone,
    address,
    city,
    country,
    panVat,
    photoURL: "",
    provider: "password",
    createdAt: new Date(),
  });

  return user;
};

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

/* ================= GOOGLE AUTH ================= */

export const loginWithGoogle = async (role = "buyer") => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  // Create user document only first time
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName,
      role,
      photoURL: "",
      provider: "google",
      createdAt: new Date(),
    });
  }

  return user;
};

export const uploadProfileImage = async (file, uid) => {
  const imageRef = ref(storage, `users/${uid}.jpg`);

  // upload image
  await uploadBytes(imageRef, file);

  // get URL
  const url = await getDownloadURL(imageRef);

  // save to firestore
  await updateDoc(doc(db, "users", uid), {
    photoURL: url,
  });

  return url;
};
