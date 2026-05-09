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

export async function getFavorites(uid, token) {
    if(!uid) return null;
    const response = await fetch(`/api/favorites?uid=${uid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function getFavoritesTitle(uid, token) {
    console.log("before getFavoritesTitle");
    if(!uid) return [];
    console.log("get favorite title");
    console.log(`${token}`)
    const response = await fetch(`/api/favorites/title?uid=${uid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export async function addFavorite(uid, token, title) {
    console.log(`add favorite -> ${uid} ${title}`);
    if(!uid) return;
    const response = await fetch(`/api/favorites`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uid, 
            title
        })
    });
}

export async function removeFavorites(uid, token, titles) {
    if(!uid) return;
    const response = await fetch(`/api/favorites`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uid, 
            titles
        })
    });
}

export async function search(query) {
    console.log(query);
    const response = await fetch(`/api/search?query=${query}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const data = response.json();
    console.log(data);
    return data;
}