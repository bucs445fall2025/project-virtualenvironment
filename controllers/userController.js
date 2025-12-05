// @desc Register User
// @route POST api/users/register
// @access public
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class UserSession {
    constructor(id, username, email){ 
        this.id = id;
        this.username = username;
        this.email = email;
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All Fields Mandatory");
    }
    const userAvailable = await User.findOne({email});

    if (userAvailable){
        return res.status(400).json({ error: "Email already in use"});
        throw new Error("Email already in use");

    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log( `User created ${user}`);
    if (user) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "12h"})
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 12 * 60 * 60 * 1000
        });
        const newSession = new UserSession(user.id, user.username, user.email);
        req.session.user = newSession; 
        res.status(201).json({_id: user.id, email: user.email, redirect: '/homepage'});
    } else {
        return res.status(400).json({error: "User Data is Not Valid"});
    }
});

// @desc Login User
// @route POST api/users/register
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All Fields Mandatory");
    }
    const user = await User.findOne({ email });

    // Compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "12h"})
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 12 * 60 * 60 * 1000
        })
        const newSession = new UserSession(user.id, user.username, user.email);
        req.session.user = newSession; 
        return res.status(200).json({ redirect: '/homepage' })

    }
    else {
        res.status(401).json({ error: "email or password was not valid"});
    }
});

// @desc Login User
// @route POST api/users/register
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "Login User"})
});

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");

    //Taken from express website
    req.session.user = null
    req.session.save(function (err) {
      if (err) next(err)
  
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err)
        res.status(201).json({redirect: '/'})
      })
    })
})
module.exports = { registerUser, loginUser, currentUser, logoutUser }