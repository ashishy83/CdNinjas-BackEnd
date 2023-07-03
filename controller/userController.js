const User = require('../models/User');
const bcrypt = require('bcrypt');


//get user Profile
exports.getUserProfile = async (req,res)=>{
    try{
        const userId = req.User._id;
        const user = await User.findById(userId).select("_password");
        res.status(200).json(User);
    }
    catch(error) {
        console.log("Error in Retrieving User Profile",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

//Update User Profile

exports.updateUserProfile = async(req,res)=>{
    try{
        const userId = req.User._id;
        const {name,email}= req.body;

        //Find user by Id

        const user = User.findById(userId);

        if(!user){
            return res.status(401).json({message:'No such user found!'});

        }

        //Update user mail and name
        user.name = name; 
        user.email = email;

        await user.save();
        res.status(200).json({message:"User Profile Updated Successfully"})
    }
    catch(error) {
        console.log("Error in Updating User data",error);
        res.status(500).json({message:"Internal Server Error"})
    }
};

exports.resetPassword = async(req,res)=>{
    try {
        const {currentPassword, newPassword} = req.body;
        const user = await User.findById(req.User.userId);

        //compare Passwords

        const isPasswordValid = await bcrypt.compare(currentPassword,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:'Incorrect current Password'});

        }
        // hashing new Password
        const hashedPassword = await bcrypt.hash(newPassword,10);
        //update user Password
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({message:'Password changed successfull'});
    } catch (error) {
        console.log("Error resetting the password",error);
        res.status(500).json({message:'Internal Server Error!'});
    }
}

module.exports = exports;