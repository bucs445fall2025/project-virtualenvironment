const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const session = require('express-session');
const connectDb = require('./config/dbConnection');
const jwt = require('jsonwebtoken');
const {validateToken} = require('./middleware/validateTokenHandler')

const cors = require('cors');

require('dotenv').config();
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: "http://localhost:3000", // your frontend origin
    credentials: true
}));
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 12 * 60 * 60 * 1000}
}));

connectDb();

app.use(express.json({ limit: "50mb"}));
app.use(cookieParser());
app.use("/api/data", require("./routes/dataRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token){
        return res.redirect("/login");
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return res.redirect("/homepage");
    }
    catch{
        return res.redirect("/login");
    }
})
app.get("/dashboard", validateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "loginPage.html"));
});

app.get("/homepage", validateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "start.html"));
});

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
    console.log("App listening on port 3000");
})