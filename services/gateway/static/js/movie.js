export async function getAllMovie(page){
    const response = await fetch(`/api/content/allMovie?page=${page}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function getFavorites(uid) {
    if(!uid) return null;
    const response = await fetch(`/api/content/favorites?uid=${uid}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function getFavoritesTitle(uid) {
    console.log("before getFavoritesTitle");
    console.log(`${uid}`)
    if(!uid) return [];
    console.log("get favorite title");
    const response = await fetch(`/api/content/favorites/title?uid=${uid}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export async function addFavorite(uid, title) {
    console.log(`add favorite -> ${uid} ${title}`);
    if(!uid) return;
    const response = await fetch(`/api/content/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uid, 
            title
        })
    });
}

export async function removeFavorites(uid, titles) {
    if(!uid) return;
    const response = await fetch(`/api/content/favorites`, {
        method: "DELETE",
        headers: {
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
    const response = await fetch(`/api/content/search?query=${query}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const data = response.json();
    console.log(data);
    return data;
}