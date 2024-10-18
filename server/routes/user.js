const express = require("express");
const router = express.Router();
require("dotenv").config();
const userController = require("../controllers/user-controller");

router.post("/signup", userController.createUser);
router.get("/", userController.getUsers);
module.exports = router;
