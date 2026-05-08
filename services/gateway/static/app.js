import { authen } from "./js/auth.js";

const signinBtn = document.getElementById("login-btn");

signinBtn.addEventListener("click", async () => {
    const data = await authen();
})