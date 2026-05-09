import express from "express";
import { getMovieByPage, getFavorites, getFavoritesTitle, getSearch } from "./core/movie.js";
import { createUser } from "./controller/userController.js";
import { insertFavorite, removeFavorites } from "./controller/movieController.js";

const router = express.Router();

router.get("/allMovie", async (req, res) => {
    let page;
    try{
        page = req.query.page;
    }
    catch{
        return res.sendStatus(400);
    }
    try{
        const data = await getMovieByPage(page);
        // console.log(JSON.stringify(data));
        return res.status(200).json(data);
    }
    catch{
        return res.sendStatus(500);
    }
});

router.post("/auth", async (req, res) => {
    const uid = req.body.uid;
    console.log(uid);
    try{
        await createUser(uid);
    }
    catch(err){
        console.log(err);
    }
    return res.sendStatus(200);
});

router.get("/favorites", async (req, res) => {
    const uid = req.query.uid;
    console.log(`query uid -> ${uid}`)
    const movies = await getFavorites(uid);
    // console.log(`Return favorite -> ${movies}`);
    return res.json(movies);
});

router.post("/favorites", async (req, res) => {
    const uid = req.body.uid;
    const title = req.body.title;
    console.log(`post favorite ${uid} ${title}`);
    await insertFavorite(uid, title);
    return res.sendStatus(200);
})

router.delete("/favorites", async (req, res) => {
    const uid = req.body.uid;
    const titles = req.body.titles;
    await removeFavorites(uid, titles);
    return res.sendStatus(200);
});

router.get("/favorites/title", async (req, res) => {
    const uid = req.query.uid;
    console.log("get favorite title");
    let titles = await getFavoritesTitle(uid);
    if(!titles) titles = [];
    console.log(`Will return -> ${JSON.stringify(titles)}`)
    return res.json(titles);
});

router.get("/search", async (req, res) => {
    const query = req.query.query;
    const movies = await getSearch(query);
    console.log(`Search -> ${query}`);
    return res.json(movies);
});

export default router;