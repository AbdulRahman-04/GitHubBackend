import express from "express"
import reposModel from "../../models/Repos/Repos.js"

const router = express.Router();

router.post("/Createrepo", async (req, res)=>{
    try {

        let userInp = req.body

        await reposModel.create(userInp);
        res.status(200).json({msg: `repo created successfully!🙌`})
        
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})

router.get("/api/repos", async (req, res)=>{
    try {

        let getAll = await reposModel.find({})
        res.status(200).json({msg: getAll})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});


router.get("/api/repos/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        let getOne = await reposModel.findOne({_id: paramsId})
        res.status(200).json(getOne)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});

router.put("/api/repos/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        let userInp = req.body;
        await reposModel.updateOne({_id: paramsId}, {$set: userInp});
        res.status(200).json({msg: `repo updated successfully!✅`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.delete("/api/repos/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        await reposModel.deleteOne({_id: paramsId})
        res.status(200).json({msg: `repo deleted succesfully!🙌`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


router.delete("/deleteall", async (req, res)=>{
    try {
        await reposModel.deleteMany({});
        res.status(200).json({msg: `all repos deleted✅`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


export default router