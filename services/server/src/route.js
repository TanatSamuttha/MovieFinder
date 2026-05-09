import express from "express";
import { getMovieByPage, getFavorites } from "./core/movie.js";
import { createUser } from "./controller/userController.js";
import { insertFavorite } from "./controller/movieController.js";

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
        console.log(JSON.stringify(data));
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
    const movies = getFavorites(uid);
    return res.json(movies);
});

router.post("/favorites", async (req, res) => {
    const uid = req.body.uid;
    const title = req.body.title;
    console.log(`post favorite ${uid} ${title}`);
    await insertFavorite(uid, title);
    return res.sendStatus(200);
})

export default router;