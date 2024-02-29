const express = require("express");
const { login, register } = require("../User Controller/Usercontroller");

const router = express.Router();

router.post ("/login", login)
router.post ("/register", register)

module.exports = router
