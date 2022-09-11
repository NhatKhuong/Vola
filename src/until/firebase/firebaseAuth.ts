import  'firebase/app'
import {signInWithPopup,getAuth} from "firebase/auth";
import {app} from '../../config/firebase/firebaseConfig'
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth =getAuth(app);
export const loginWithGoogle = ()=>{
    signInWithPopup(auth, provider)
    .then((result:any) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(token)
      console.log(user)
      // ...
    }).catch((error:any) => {
        console.log(error)
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

}