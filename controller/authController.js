const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../config');


//User Registration
exports.register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
//Check if user already exists.
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(201).json({message:"User Already Exists"});
        }
//Hash Password
        const hashedPswd = await bcrypt.hash(password,10);
//Create new user.

        const newUser = new User({
            name,
            email,
            password:hashedPswd
        });
        await newUser.save();

    }
    catch(error){
        console.log("Error Registering User",error);
        return res.status(500).json({message:"Internal Server error"});
    }
};

//User Login

exports.login = async (req,res)=>{
    try{
        const {email,password}= req.body;
        //Check if the user in db using Email Id already exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Authentication Failed"});
        }
        //Compare Password
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Authentication Failed"});
        }
        //Generate jwt token

        const token = jwt.sign({userId:user._id},config.secret_key,{expiresIn:'1h'});
        res.status(200).json({token});

    }
    catch(error) {
        console.log('Error Authenticating the user:',error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = exports;
