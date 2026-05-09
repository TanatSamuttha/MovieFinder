import supabase from "../config/supabase.js";

export async function queryFavorite(uid) {
    console.log(`uid -> ${uid}`);
    const {data, error} = await supabase.from("users").select("favorites").eq("uid", uid).single();
    console.log(`Query favorite -> ${JSON.stringify(data)}`);
    return data;
}