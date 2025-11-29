const express = require("express");
const { storeProject, getProjects } = require("../controllers/dataController.js");

const router = express.Router();


router.post("/save_project", storeProject);
router.get("/get_projects", getProjects);

module.exports = router;