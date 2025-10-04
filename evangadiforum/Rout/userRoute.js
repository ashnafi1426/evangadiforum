const express = require("express");
const router = express.Router();

const { register, login } = require("../controller/userController");

router.post("/register", register); // ✅ Make sure this is a real function
router.post("/login", login);

module.exports = router;
