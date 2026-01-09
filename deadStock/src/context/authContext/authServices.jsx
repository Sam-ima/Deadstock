import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

const googleProvider = new GoogleAuthProvider();

/* ================= EMAIL / PASSWORD ================= */

export const signupWithEmail = async (data) => {
  const { email, password, fullName, role, shopName } = data;

  const { user } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    fullName,
    role,
    shopName: role === "seller" ? shopName : null,
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
      provider: "google",
      createdAt: new Date(),
    });
  }

  return user;
};
