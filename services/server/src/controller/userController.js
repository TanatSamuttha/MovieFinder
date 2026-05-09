import supabase from "../config/supabase.js";

export async function createUser(uid) {
    const user = {uid};
    const {data, error} = await supabase.from("users").insert([user]).select("*").single();
    console.log(`Created new user -> ${JSON.stringify(data)}`);
}