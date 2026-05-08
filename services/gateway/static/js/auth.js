import {
  auth,
  provider,
  signInWithPopup,
  signOut
} from "./firebase.js";

export async function authen(){
    const result = await signInWithPopup(
      auth,
      provider
    );

    const user = result.user;
    const idToken = await user.getIdToken();

    return {
        user,
        idToken
    };
}

export async function logout() {
    await signOut(auth);
}