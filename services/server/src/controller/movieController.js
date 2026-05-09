import supabase from "../config/supabase.js";

export async function queryFavorite(uid) {
    console.log(`uid -> ${uid}`);
    const {data, error} = await supabase.from("users").select("favorites").eq("uid", uid).single();
    console.log(`Query favorite -> ${JSON.stringify(data)}`);
    return data;
}

export async function insertFavorite(uid, title) {
    const { data } = await supabase
        .from("users")
        .select("favorites")
        .eq("uid", uid)
        .single();

    const favorites = data?.favorites || [];

    if (favorites.includes(title)) {
        console.log("already exists");
        return;
    }

    const { res, error } = await supabase
        .from("users")
        .update({
            favorites: [...favorites, title]
        })
        .eq("uid", uid);

    if (error) console.error(error);

    console.log(`Insert favorite -> ${JSON.stringify(res)}`);
}