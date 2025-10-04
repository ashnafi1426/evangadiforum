const express = require("express");
const router = express.Router();
const authMiddleware =require("../middleware/authMiddleware")

const { register, login,checkUser } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register); // ✅ Make sure this is a real function
router.post("/login", login);
router.get("/checkUser", authMiddleware,checkUser);

module.exports = router;
