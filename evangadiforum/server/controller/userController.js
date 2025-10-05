const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const StatusCodes = require("http-status-codes");
const jwt=require("jsonwebtoken");
async function register(req, res) {
  const { username, firstName, lastName, email, password } = req.body;

  if (!username || !firstName || !lastName || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "All fields are required" });
  }
  if (password.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password must be at least 8 characters" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already exists" });
    }

    await dbConnection.query(
      "INSERT INTO users (username, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstName, lastName, email, hashPassword]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "User created" });

  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
}
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email and password are required" });
  }

  try {
    const [users] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid email or password" });
    }

    const user = users[0]; // ✅ Fix 1: define user
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      { username:user.username, userid: user.userid }, // ✅ Fix 2: correct token payload
      "secret",
      { expiresIn: "1d" }
    );

    delete user.password; // ✅ Optional: remove hashed password from response

    return res.status(StatusCodes.OK).json({
      msg: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
}
async function checkUser(req,res){
  const username=req.user.username;
  const userid=req.user.userid;
  res.status(StatusCodes.OK).json({msg:"valid user",username,userid})
 
  res.send("check user");
}
module.exports = { register,login,checkUser};
