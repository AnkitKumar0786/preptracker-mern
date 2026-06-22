const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

async function registerUser(req,res){
    
    try{
        // collect data
        const {username,email,password,college,branch,graduationYear} = req.body;

        // check that is it already exist or not
        const isAlreadyExist = await userModel.findOne({
        $or:[
                {username},
                {email}
            ]
        })

        if(isAlreadyExist){
            return res.status(409).json({ message: " User already exist "});
        }

        // generate hash for secure password using bcrypt
        const hash = await bcrypt.hash(password,10);

        // create user
        const user = await userModel.create({
            username,
            email,
            password:hash,
            college,
            branch,
            graduationYear
        })

        // create token
        const token = jwt.sign({
            id: user._id,
            branch: user.branch
        },process.env.JWT_SECRET)

        // save the token in cookie
        res.cookie("token",token,{ httpOnly: true });

        res.status(201).json({ 
            message: "user created succesfully ",
            user:{
                username,
                email,
                college,
                branch,
                graduationYear
            }
        });
    }
    catch (error) {
            console.error("Registration Error:", error);
            res.status(500).json({ message: "Internal server error during registration" });
        }
}

async function loginUser(req,res){

    try{
        const{username,email,password} = req.body;

        // find user
    
        const user = await userModel.findOne({
            $or:[
                    {username},
                    {email}
                ]
        })

        if(!user){
            return res.status(401).json({message:"Invalid user"})
        }

        // Now verify the password
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({message:"password is incorrect"});
        }


        // if exist then create token and login
        const token = jwt.sign({
            id:user._id,
            branch:user.branch
        },process.env.JWT_SECRET);

        // save token to the cookie
        res.cookie("token",token,{ httpOnly: true });

        res.status(200).json({
            message:"user login successfully",
            user:{
                username: user.username,
                email: user.email,
                college: user.college,
                branch: user.branch,
                graduationYear: user.graduationYear
            }
        })
    }catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ message: "Internal server error during login" });
        }

}

async function logoutUser(req,res){

    try{
        res.clearCookie("token");
        res.status(200).json({message:"user logout successfully"})
    }catch(error){
        res.status(500).json({ message: "Internal server error during logout" });
    }

}

async function ProfileUpdate(req,res){
    
    try{
        // collect the user
        const userId = req.user.id;

        // password can't change here
        if(req.body.password){
        return res.status(400).json({message:"password can't change from here"});
        }

        //find and update the user in database
        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            {$set: req.body},  // update the data that provides
            {
                returnDocument: 'after',  // return the new value's only
                runValidators:true   // rerun the schema 
            }
        ).select("-password")  // don't return password

        // if user not found
        if(!updateUser){
            return res.status(404).json({message:"user not found"});
        }

        res.status(200).json({message: "profile updated successfully"});
    }
    catch(err){
        console.error("Update Profile Error:", err);
        res.status(500).json({ message: "Internal server error during profile update" });
    }

}

async function viewProfile(req,res){

    try{
        const userId = req.user.id;

        const user = await userModel.findById(userId).select("-password"); // don't fetch password

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        res.status(200).json({
            message:"user data fetched successfully",
            user
        })
    }catch(err){
        console.error("view profile error: ",err);
        res.status(500).json({message:"internal error due to view profile"})
    }

}






module.exports = { registerUser , loginUser, logoutUser,ProfileUpdate, viewProfile } 