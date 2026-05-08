import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, provider } from "./firebase";

// Login
export async function login() {
  return await signInWithPopup(auth, provider);
}

// Logout
export async function logout() {
  return await signOut(auth);
}

// Observe auth state
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// Get ID token
export async function getToken() {
  const user = auth.currentUser;

  if (!user) return null;

  return await user.getIdToken();
}