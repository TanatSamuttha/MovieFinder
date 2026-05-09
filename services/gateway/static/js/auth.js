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
    const uid = await user.uid;
    const token = await user.getIdToken();

    const response = await fetch(`/api/auth`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({uid})
    });

    return {
        user,
        uid,
        token
    };
}

export async function logout() {
    await signOut(auth);
}