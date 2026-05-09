import { authen, logout } from "./js/auth.js";
import { getAllMovie } from "./js/movie.js";

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
const gotoInput = document.getElementById('goto-input');
const searchBtn = document.getElementById('search-btn');
const sectionTitle = document.getElementById('section-title');
const paginationWrapper = document.getElementById('pagination-wrapper');

let currentPage = 1;
const totalPages = 500;

let uid;

loginBtn.addEventListener("click", async () => {
    const data = await authen();
    if(!data) return;
    const user = data.user;
    uid = user.uid;
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
    favSection.classList.add('hidden');
    uid = null;
})

window.onload = async () => {
    renderPaginationControls();
    await renderAllMovies(1);
}

async function renderAllMovies(page = 1) {
     try {
        const data = await getAllMovie(page);
        const movies = data.results;

        movieGrid.innerHTML = "";
        if (!movies || movies.length === 0) {
            movieGrid.innerHTML = `
                <p style="text-align:center; width:100%;">
                    No movies found.
                </p>
            `;
            return;
        }

        movies.forEach((movie) => {
            if (!movie.poster_path) return;

            const year = movie.release_date? movie.release_date.substring(0, 4) : "N/A";
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            const card = document.createElement("div");
            card.className = "movie-card";
            card.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}">
                <div class="card-content">
                    <div class="info-container">
                        <h3 class="movie-title">
                            ${movie.title}
                        </h3>
                        <p class="movie-year">
                            ${year}
                        </p>
                    </div>
                    <button class="save-btn">
                        + Save
                    </button>
                </div>
            `;
            movieGrid.appendChild(card);
        });
    } catch (err) {
        console.error("Render Movie Error:", err);
        movieGrid.innerHTML = `
            <p style="text-align:center; width:100%; color:red;">
                Failed to load movies.
            </p>
        `;
    }
}

async function goToPage(page) {
    try {
        currentPage = page;
        renderAllMovies(page)
        renderPaginationControls();
        window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (err) {
        console.error("Pagination error:", err);
    }
}

function renderPaginationControls() {
    const pagContainer = document.getElementById('pagination-numbers');
    if (!pagContainer) return;

    pagContainer.innerHTML = '';

    const createBtn = (text, pageNum, isActive = false) => {
        const btn = document.createElement('button');
        btn.className = isActive ? 'page-btn active' : 'page-btn';
        btn.innerHTML = text;
        if (pageNum !== null && pageNum !== undefined) {
            btn.addEventListener('click', async () => {
                await goToPage(pageNum);
                renderPaginationControls();
            });
        }
        return btn;
    };

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    // First page
    if (currentPage > 2) {
        pagContainer.appendChild(createBtn(1, 1));

        if (currentPage > 3) {
            pagContainer.appendChild(createBtn('...', null));
        }
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
        pagContainer.appendChild(
            createBtn(i, i, i === currentPage)
        );
    }

    // Last page
    if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
            pagContainer.appendChild(createBtn('...', null));
        }

        pagContainer.appendChild(createBtn(totalPages, totalPages));
    }

    // NEXT BUTTON
    if (currentPage < totalPages) {
        pagContainer.appendChild(
            createBtn('›', currentPage + 1)
        );
    }
}

if (gotoInput) {
    gotoInput.addEventListener('change', async (e) => {
        let val = parseInt(e.target.value);

        if (isNaN(val)) return;

        // clamp ค่าให้อยู่ในช่วง 1 - 500
        if (val < 1) val = 1;
        if (val > totalPages) val = totalPages;

        await goToPage(val);

        // เคลียร์ input หลังใช้งาน
        e.target.value = '';
    });
}