import express from "express"
import userModel from "../../models/Users/Users.js"

const router = express.Router();

router.get("/getall", async (req, res)=>{
    try {

        let getAll = await userModel.find({})
        res.status(200).json({msg: getAll})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});


router.get("/getone/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        let getOne = await userModel.find({_id: paramsId})
        res.status(200).json({msg: getOne})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});

router.put("/edit/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        let userInp = req.body;
        await userModel.updateOne({_id: paramsId}, {$set: userInp});
        res.status(200).json({msg: `user updated successfully!✅`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.delete("/deleteone/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        await userModel.deleteOne({_id: paramsId})
        res.status(200).json({msg: `user deleted succesfully!🙌`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


router.delete("/deleteall", async (req, res)=>{
    try {
        await userModel.deleteMany({});
        res.status(200).json({msg: `all users deleted✅`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


export default router