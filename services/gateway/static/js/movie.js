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

export async function getFavorites(uid) {
    if(!uid) return null;
    const response = await fetch(`/api/favorites?uid=${uid}`, {
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
    const response = await fetch(`/api/favorites/title?uid=${uid}`, {
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
    const response = await fetch(`/api/favorites`, {
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

export async function removeFavorite(uid, titles) {
    if(!uid) return;
    const response = await fetch(`/api/favorites`, {
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