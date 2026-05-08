import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJCQQBoZQJ3NckCuH8mvmEZ7KzQse9gLI",
  authDomain: "movie-finder-42e85.firebaseapp.com",
  projectId: "movie-finder-42e85",
  appId: "1:533271386489:web:e36fb2d0f48f64436e77a8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signOut
};