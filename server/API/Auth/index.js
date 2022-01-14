import express from "express";
import bcrypt from "bcryptjs";

// models
import { UserModel } from "../../database/user";

// validations
import { ValidateSignup, ValidateSignin } from "../../validation/auth";
const Router = express.Router();

/*
Route       /Signup
Desc        /sigup using email and password
Params      None
Access      Public
Method      Post
*/

Router.post("/signup", async (res, req) => {
    try {
        await ValidateSignup(req.body.credentials)
        const { email, password, fullname, phoneNumber } = req.body.credentials;/*fetch all the detail from body or postman which handeling the req*/
        const checkUserByEmail = await UserModel.findOne({ email });/*finf the email using findone method by name like checkUserByEmail*/
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ error: "User already Exists!!!" });
        }
        // hasing ur password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt)/* password- in which params u want to genrate salt...n bcryptSalt -for in how many salt gen */
        // hashing- use bcrytjs which basically used hash the pass.. for security.. like u write or entr the pass thn pass is converted into  code lot of time ie, pass- xyz123 -> fvjh5$#52jbrq#^$ ->rd5456%$0sbjask ->fcs&$W ->hd#$tzvser8*  somthing like this ..its called hasing.. and its a salting 3times new code genrated thn 3 salt...this code -no one can undersandable not a human machine noone
        // save to db

        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword
        });

        // JWT token -use for recognizing the username n pass...   increasing authorizating security 
        const token = jwt.sign({ user: { fullname, email } }, "ZomatoApp")/*in brac.- these are shoulb be what is the format of token , "" - id should be unique */
        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ error: console.error.message });

    }

});
/*
Route       /signin
Desc        Signin using email and password
Params      None
Access      Public
Method      POST
*/

Router.post("/signin", async (req, res) => {
    try {
        await ValidateSignin(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials/* findbyemailandpassword- function in mongo which is use for find any by email n pass*/
        );
        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});