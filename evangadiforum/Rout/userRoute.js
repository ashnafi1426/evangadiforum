const express = require("express");
const router = express.Router();

const { register, login, checkUser } = require("../controller/userController");

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.post("/register", register);  // ✅ Connected correctly
router.post("/login", login);
router.get("/check", checkUser);

module.exports = router;
