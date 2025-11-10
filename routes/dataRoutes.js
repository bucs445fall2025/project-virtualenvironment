const express = require("express");
const { storeProject } = require("../controllers/dataController.js");

const router = express.Router();


router.post("/save_project", storeProject);


module.exports = router;