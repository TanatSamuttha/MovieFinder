import { authen, logout } from "./js/auth.js";
import { addFavorite, getAllMovie, getFavorites, getFavoritesTitle, removeFavorites, search } from "./js/movie.js";

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
let favoritesTitle = [];
let isSearching = false;

let uid;

renderPaginationControls();
await renderAllMovies(1);

const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");

applyTheme(savedTheme);
themeBtn.addEventListener("click", toggleTheme);

if (gotoInput) {
    gotoInput.addEventListener('change', async (e) => {
        let val = parseInt(e.target.value);

        if (isNaN(val)) return;

        if (val < 1) val = 1;
        if (val > totalPages) val = totalPages;

        await goToPage(val);

        e.target.value = '';
    });
}

loginBtn.addEventListener("click", async () => {
    const data = await authen();
    if(!data) return;
    const user = data.user;
    uid = user.uid;
    // console.log(JSON.stringify(user));
    loginBtn.classList.add('hidden');
    userProfile.classList.remove('hidden');
    userInfo.textContent = `Hi, ${user.displayName.split(' ')[0]}`;
    favSection.classList.remove('hidden');
    await renderAllMovies(currentPage);
    await renderFavorites();
})

logoutBtn.addEventListener("click", async () => {
    await logout();
    loginBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
    favSection.classList.add('hidden');
    uid = null;
    await renderAllMovies(currentPage);
})

function renderMovieList(movies) {
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

        const year = movie.release_date
            ? movie.release_date.substring(0, 4)
            : "N/A";

        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}">
            <div class="card-content">
                <div class="info-container">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-year">${year}</p>
                </div>
                <button class="save-btn">+ Save</button>
            </div>
        `;

        const saveBtn = card.querySelector(".save-btn");

        if (favoritesTitle.includes(movie.title)) {
            saveBtn.classList.add("saved-state");
            saveBtn.textContent = "✅ Saved";
        }

        saveBtn.addEventListener("click", async () => {
            if (!uid) {
                alert("Please login first");
                return;
            }

            saveBtn.disabled = true;
            saveBtn.textContent = "Saving...";

            try {
                await addFavorite(uid, movie.title);

                saveBtn.classList.add("saved-state");
                saveBtn.textContent = "✅ Saved";

                showToast("Saved to Favorites!");

                await renderFavorites();

            } catch (err) {
                console.error(err);

                saveBtn.disabled = false;
                saveBtn.textContent = "+ Save";
            }
        });

        movieGrid.appendChild(card);
    });
}

async function renderAllMovies(page = 1) {
    favoritesTitle = await getFavoritesTitle(uid);

    try {
        const data = await getAllMovie(page);

        renderMovieList(data.results);

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
            createBtn('»', currentPage + 1)
        );
    }
}

async function renderFavorites() {
    if (!uid) return;

    const movies = await getFavorites(uid);

    favGrid.innerHTML = "";

    if (!movies || movies.length === 0) {
        favGrid.innerHTML = `
            <p style="text-align:center; width:100%;">
                No favorite movies yet.
            </p>
        `;
        return;
    }

    movies.forEach(data => {
        const movie = data.results[0];
        console.log(movie);
        const card = document.createElement("div");
        card.className = "movie-card";

        const year = movie.release_date 
            ? movie.release_date.substring(0, 4) 
            : "N/A";

        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        card.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}">
            <div class="card-content">
                <div class="info-container">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-year">${year}</p>
                </div>
                <button class="delete-btn">❌ Remove</button>
            </div>
        `;
        const removeBtn = card.querySelector(".delete-btn");

        removeBtn.addEventListener("click", async () => {
            try {
                removeBtn.disabled = true;
                removeBtn.textContent = "Removing...";

                await removeFavorites(uid, [movie.title]);
                card.remove();

                await renderAllMovies(currentPage);

            } catch (err) {
                console.error(err);
                removeBtn.disabled = false;
                removeBtn.textContent = "❌ Remove";
            }
        });

        favGrid.appendChild(card);
    });
}

clearFavBtn.addEventListener("click", async () => {
    if (!uid) return;

    const confirmDelete = confirm(
        "Are you sure you want to remove ALL your saved movies? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
        clearFavBtn.disabled = true;
        clearFavBtn.textContent = "Clearing...";

        await removeFavorites(uid, favoritesTitle);

        favGrid.innerHTML = "";
        favoritesTitle = [];

        await renderAllMovies(currentPage);

        showToast("All favorites cleared!", "#4caf50");

    } catch (err) {
        console.error(err);
        showToast("Failed to clear favorites", "#f44336");

    } finally {
        clearFavBtn.disabled = false;
        clearFavBtn.textContent = "🗑️ Clear All";
    }
});

function showToast(message, color = "#4caf50") {
    toast.textContent = message;
    toast.style.backgroundColor = color;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2500);
}

searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        await handleSearch(searchInput.value);
    }
});

async function handleSearch(query) {
    query = query.trim();

    if (!query) {
        isSearching = false;

        sectionTitle.textContent = "Trending Movies";
        paginationWrapper.classList.remove("hidden");

        await renderAllMovies(currentPage);
        return;
    }

    try {
        isSearching = true;

        sectionTitle.textContent = `✨ Searching for "${query}"...`;

        movieGrid.innerHTML = `
            <div class="ai-loader">
                Searching movies...
            </div>
        `;

        paginationWrapper.classList.add("hidden");

        const data = await search(query);

        console.log(data);

        const movies = data.flatMap(item => item.results || []);

        movieGrid.innerHTML = "";

        if (!movies.length) {
            movieGrid.innerHTML = `
                <p style="text-align:center; width:100%;">
                    No movies found.
                </p>
            `;
            return;
        }

        sectionTitle.textContent = `✨ Results for "${query}"`;

        renderMovieList(movies);

    } catch (err) {
        console.error("Search Error:", err);

        sectionTitle.textContent = "Search Failed";

        movieGrid.innerHTML = `
            <p style="text-align:center; width:100%; color:red;">
                Failed to search movies.
            </p>
        `;
    }
}

function applyTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-mode", isLight);

    // behavior เหมือนโค้ดเดิม 100%
    themeBtn.textContent = isLight ? "🌙" : "☀️";
}

function toggleTheme() {
    const isLight =
        document.body.classList.contains("light-mode");

    const newTheme = isLight ? "dark" : "light";

    applyTheme(newTheme);

    localStorage.setItem("theme", newTheme);
}