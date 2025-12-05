const express = require("express");
const { storeProject, getProjects, loadProject, deleteProject } = require("../controllers/dataController.js");

const router = express.Router();


router.post("/save_project", storeProject);
router.get("/get_projects", getProjects);
router.post("/load_project", loadProject);
router.post("/delete_project", deleteProject)

module.exports = router;