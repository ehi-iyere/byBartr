const express = require("express");
const router = express.Router();
require("dotenv").config();
const authorize = require("../middleware/userAuth");
const projectController = require("../controllers/project-controller");

router.post("/createproject", authorize, projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:projectId/details", projectController.getProjectbyId);
router.get("/:user_id/projects", projectController.getProjectByUser);
router.get("/theme", projectController.getAllThemes);
router.put("/edit/:projectId", authorize, projectController.editProject);
router.delete("/delete/:projectId", authorize, projectController.deleteProject);
module.exports = router;
