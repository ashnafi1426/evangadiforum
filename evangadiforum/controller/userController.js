const dbConnection = require("../db/dbconfig");

async function register(req, res) {
  const { username, firstName, lastName, email, password } = req.body;

  // Input validation
  if (!username || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required information" });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: "Password must be at least 8 characters" });
  }

  try {
    // Check if user exists
    const [existingUser] = await dbConnection.query(
      "SELECT username, userId FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "User already registered" });
    }

    // Insert user
    await dbConnection.query(
      "INSERT INTO users (username, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstName, lastName, email, password]
    );

    return res.status(201).json({ msg: "User created" });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function login(req, res) {
  res.send("login");
}

async function checkUser(req, res) {
  res.send("check user");
}

module.exports = { register, login, checkUser };
