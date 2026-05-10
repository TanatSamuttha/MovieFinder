export async function getAllMovie(page){
    const response = await fetch(`/api/allMovie?page=${page}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function getFavorites(token) {
    if(!token) return null;
    const response = await fetch(`/api/favorites`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function getFavoritesTitle(token) {
    if(!token) return [];
    const response = await fetch(`/api/favorites/title`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function addFavorite(token, title) {
    if(!token) return;
    const response = await fetch(`/api/favorites`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title
        })
    });
}

export async function removeFavorites(token, titles) {
    if(!token) return;
    const response = await fetch(`/api/favorites`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titles
        })
    });
}

export async function search(query) {
    const response = await fetch(`/api/search?query=${query}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const data = response.json();
    return data;
}