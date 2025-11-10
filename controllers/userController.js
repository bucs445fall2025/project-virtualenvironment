// @desc Register User
// @route POST api/users/register
// @access public
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All Fields Mandatory");
    }
    const userAvailable = await User.findOne({email});

    if (userAvailable){
        res.status(400);
        throw new Error("Email already in use");

    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log( `User created ${user}`);
    if (user) {
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User Data is Not Valid");
    }



    res.json({message: "Register The User"})
});

// @desc Login User
// @route POST api/users/register
// @access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({message: "Login User"})
});

// @desc Login User
// @route POST api/users/register
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "Login User"})
});
module.exports = { registerUser, loginUser, currentUser }