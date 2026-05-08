import express from "express";
import getMovieByPage from "./core/movie.js";

const router = express.Router();

router.get("/allMovie", async (req, res) => {
    let page;
    try{
        page = req.body.page;
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

export default router;