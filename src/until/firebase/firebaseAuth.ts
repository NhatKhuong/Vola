import "firebase/app";
import {
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { Exception } from "sass";
import { app } from "../../config/firebase/firebaseConfig";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export const loginWithGoogle = async() => {
    const user = await signInWithPopup(auth, provider)
    return user;
};

export const singUpWithEmailAndPassword =  async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmailAndPassword = async (
    email: string,
    password: string
) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
