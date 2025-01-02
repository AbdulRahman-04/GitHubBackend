import express from "express"
import config from "config"
import "./utils/dbConnect.js"
import userRouter from "./controllers/users/index.js"
import reposRouter from "./controllers/repos/index.js"
import gistRouter from "./controllers/gists/index.js"
import publicRouter from "./public/index.js"
import authMiddleware from "./middleware/auth.js"

const app = express()

const PORT = config.get("PORT")

app.use(express.json());

app.get("/home", (req, res)=>{
    try {

        res.status(200).json({msg: `HOME🏡`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


// public api's
app.use("/api/public", publicRouter)


// middleware
app.use(authMiddleware)

// private api's
app.use("/api/private/users", userRouter);
app.use("/api/private/repos", reposRouter);
app.use("/api/private/gists", gistRouter)


app.listen(PORT, ()=>{
    console.log(`your web app is running live at port ${PORT}`);
})