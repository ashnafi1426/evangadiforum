const dbConnection = require("../db/dbConfig");

async function register(req, res) {
  const { username, firstName, lastName, email, password } = req.body;

  if (!username || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: "Password must be at least 8 characters" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }
    await dbConnection.query(
      "INSERT INTO users (username, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstName, lastName, email, password]
    );


    return res.status(201).json({ msg: "User created" });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
module.exports = { register };
