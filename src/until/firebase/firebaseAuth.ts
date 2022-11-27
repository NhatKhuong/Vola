import "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Exception } from "sass";
import { app } from "../../config/firebase/firebaseConfig";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export const loginWithGoogle = async () => {
  const user = await signInWithPopup(auth, provider);
  return user;
};

export const singUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  var actionCodeSettings = {
    url: "http://localhost:3000",
    handleCodeInApp: true,
  };
  await sendEmailVerification(result.user, actionCodeSettings);
  return result;
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const sendRequestForgotPassword = async (
  email: string,
) => {
  return await sendPasswordResetEmail(auth, email);
};
