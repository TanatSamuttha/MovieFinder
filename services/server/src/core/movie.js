import dotenv from "dotenv";

const result = dotenv.config({path: ".env"});
const token = process.env.TMDB_TOKEN;

export default async function getMovieByPage(page){
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