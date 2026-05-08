import { authen, logout } from "./js/auth.js";

const themeBtn = document.getElementById('theme-toggle');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const userProfile = document.getElementById('user-profile');
const toast = document.getElementById('toast');
const movieGrid = document.getElementById('movie-grid');
const favSection = document.getElementById('favorites-section');
const favGrid = document.getElementById('favorites-grid');
const clearFavBtn = document.getElementById('clear-fav-btn'); 

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sectionTitle = document.getElementById('section-title');
const paginationWrapper = document.getElementById('pagination-wrapper');

loginBtn.addEventListener("click", async () => {
    const data = await authen();
    if(!data) return;
    const user = data.user;
    console.log(JSON.stringify(user));
    loginBtn.classList.add('hidden');
    userProfile.classList.remove('hidden');
    userInfo.textContent = `Hi, ${user.displayName.split(' ')[0]}`;
    favSection.classList.remove('hidden');
})

logoutBtn.addEventListener("click", async () => {
    await logout();
    loginBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
    userInfo.textContent = `Hi, ${user.displayName.split(' ')[0]}`;
    favSection.classList.add('hidden');
})