import express from "express"
import mongoose from "mongoose"
import config from "config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"
import sendSMS from "../utils/sendSMS.js"
import userModel from "../models/Users/Users.js"

const router = express.Router()

const URL = config.get("SERVER_URL");
const KEY  = config.get("JWT_KEY");


router.post("/register", async (req, res)=>{
    try {
        // take input from user
        let {roleType, user_view_type, userName, company, phone, email, password, location, public_repos, private_repos} = req.body
        
        // duplicate check
        let userExisting = await userModel.findOne({email});
        if(userExisting){
            return res.status(200).json({msg: `user already exist!🙌`})
        }
        // hash the password
        let hashPass = await bcrypt.hash(password, 10);

        // generate two random token for email and phone
        let emailToken = Math.random().toString(36).substring(2);
        let phoneToken =  Math.random().toString(36).substring(2);

        // make a new obj and store all the user info inside it and puysh obj into db
        let newUser = {
            roleType, 
            user_view_type, 
            userName, 
            company, 
            phone, 
            email,
            password : hashPass,
            location,
            public_repos, 
            private_repos,
            userVerifyToken: {
                email: emailToken,
                phone: phoneToken
            }
        }

        await userModel.create(newUser)

        // send link on mail for verification
        let emailData = {
            from: "Team GitHub",
            to: email,
            subject: "Email Verification",
            html: "<h1> Team GitHub</h1>\n <p> Dear user, please verify your email by clicking on below link </p>\n ", 
            text: `${URL}/api/public/emailverify/${emailToken}`
        }

        sendEmail(emailData)

        // send link to mobile for verification
        let smsData = {
            body: `dear user, please verify your email here, ${URL}/api/public/phoneverify/${phoneToken}`,
            to: phone
        }

        sendSMS(smsData);

        console.log(`${URL}/api/public/emailverify/${emailToken}`);  
        console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
        
        res.status(200).json({msg: `you'll be registered as new github user once your verify your email and mobile via link provided on your email and phone number!🙌`})
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})

router.get("/emailverify/:token", async (req, res)=>{
    try {
        // take token from url
        let token = req.params.token

        // check if url token === userVerifyToken.email
        let user = await userModel.findOne({"userVerifyToken.email": token})
        if(!user){
            return res.status(200).json({msg: `invalid token❌`})
        }

        // check if user hasn't clicked the link more than once
        if(user.userVerified.email == true){
          return res.status(200).json({msg: `user email already verified!🙌`})  
        }

        // change the userVerified email to true and userVerify token email to null
        user.userVerified.email = true;
        user.userVerifyToken.email = null;

        // save the changes
        await user.save();

        res.status(200).json({msg: `email verified✅`})
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})

router.get("/phoneverify/:token", async (req, res)=>{
    try {
        // take token from url
        let token = req.params.token

        // check if url token === userVerifyToken.phone
        let user = await userModel.findOne({"userVerifyToken.phone": token})
        if(!user){
            return res.status(200).json({msg: `invalid token❌`})
        }

        // check if user hasn't clicked the link more than once
        if(user.userVerified.phone == true){
          return res.status(200).json({msg: `user phone number already verified!🙌`})  
        }

        // change the userVerified email to true and userVerify token email to null
        user.userVerified.phone = true;
        user.userVerifyToken.phone = null;

        // save the changes
        await user.save();

        res.status(200).json({msg: `phone verified✅`})
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})


//login API
router.post("/login", async (req, res)=>{
    try {
        // take input from user
        let {email, password}= req.body;

        // check if email exists in db
        let checkUser = await userModel.findOne({email});
        if(!checkUser){
            return res.status(200).json({msg: `invalid email!❌`});
        }

        // check password
        let checkPass = await bcrypt.compare(password, checkUser.password)
        if(!checkPass){
            return res.status(200).json({msg: `invalid password❌`})
        }

        //  generate jwt token
        let token = jwt.sign({checkUser}, KEY, {expiresIn: "1d"});

        res.status(200).json({msg: `user loggedin successfully!`, token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

export default router