const express = require("express");
const router = express.Router();
require("dotenv").config();
const userController = require("../controllers/user-controller");

router.post("/signup", userController.createUser);
router.post("/:id/edit", userController.updateProfile);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
module.exports = router;
