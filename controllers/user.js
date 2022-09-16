const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const bcryptedPassword = await bcrypt.hash(password,10);
    const user =  new User({
        name:name,
        email:email,
        password:bcryptedPassword
    })
    await user.save();
    return res.status(201).json({message:"Created successfully",user:user})
}

exports.loginUser = async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email});
        if(!user){
            return res.json({message:"User not found"});
        }
        const isEqual = await bcrypt.compare(password,user.password);

        if(!isEqual){
            return res.json({message:"Wrong credentials"});
        }

        let token = jwt.sign({
            email:user.email,
            userId:user._id.toString(),
        }, process.env.SECRET_KEY,{expiresIn :"5m"});

        return res.status(200).json({message:"loggedIn",token:token});
    }catch (e) {
        return res.json(e);
    }
}


exports.getUsers = async(req,res) => {
    console.log(req.user);
    const users = await User.find();
    return res.status(200).json({users:users});
}