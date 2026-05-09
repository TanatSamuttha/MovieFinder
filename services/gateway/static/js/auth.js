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
    console.log(uid);

    const response = await fetch(`/api/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({uid: uid})
    });

    return {
        user,
        uid
    };
}

export async function logout() {
    await signOut(auth);
}