import express from "express";
import getMovieByPage from "./core/movie.js";
import { createUser } from "./controller/userController.js";

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

export default router;