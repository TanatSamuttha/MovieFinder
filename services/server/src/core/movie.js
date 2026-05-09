import dotenv from "dotenv";
import { queryFavorite } from "../controller/movieController.js";

const result = dotenv.config({path: ".env"});
const token = process.env.TMDB_TOKEN;

export async function getMovieByPage(page){
    const url = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=${page}`;
    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getMovieByTitle(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${encodeURIComponent(title)}`;
    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getFavorites(uid) {
    const data = await queryFavorite(uid);
    const favorites = data?.favorites || [];

    const movies = await Promise.all(
        favorites.map(title => getMovieByTitle(title))
    );

    // console.log("get favorite ->", movies);
    return movies;
}

export async function getFavoritesTitle(uid) {
    const data = await queryFavorite(uid);
    const favorites = data.favorites;
    console.log("get favorite title");
    return favorites;
}