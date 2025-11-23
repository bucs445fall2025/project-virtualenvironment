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

connectDb();

app.use(express.json());
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
        return res.redirect("/dashboard");
    }
    catch{
        return res.redirect("/login");
    }
})
app.get("/dashboard", validateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "loginPage.html"));

})

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
    console.log("App listening on port 3000");
})