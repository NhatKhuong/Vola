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
export const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result: any) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(token);
            console.log(user);
            // ...
        })
        .catch((error: any) => {
            console.log(error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
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
