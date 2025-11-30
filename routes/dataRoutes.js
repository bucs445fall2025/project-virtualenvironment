const express = require("express");
const { storeProject, getProjects, loadProject } = require("../controllers/dataController.js");

const router = express.Router();


router.post("/save_project", storeProject);
router.get("/get_projects", getProjects);
router.post("/load_project", loadProject);

module.exports = router;