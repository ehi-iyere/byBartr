const express = require("express");
const router = express.Router();
require("dotenv").config();
const authorize = require("../middleware/userAuth");
const userController = require("../controllers/user-controller");

router.post("/signup", userController.createUser);
router.put("/:id/edit", authorize, userController.updateProfile);
router.get("/", userController.getUsers);
 router.get("/:id", userController.getUserById);
//router.get("/:email", userController.getUserByName);
module.exports = router;
