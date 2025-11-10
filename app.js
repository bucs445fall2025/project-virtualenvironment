const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const session = require('express-session');
const connectDb = require('./config/dbConnection');

require('dotenv').config();

const app = express();

connectDb();

app.use(express.json());
app.use("/api/data", require("./routes/dataRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
    console.log("App listening on port 3000");
})