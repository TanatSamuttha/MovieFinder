import admin from "../config/firebase.js";

export default async function authorize(req, res, next) {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader?.startsWith("Bearer ")){
            return res.status(401).json({
                error: "Unauthorized"
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            error: "Invalid token"
        });
    }
}