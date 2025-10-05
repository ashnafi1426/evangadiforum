const { StatusCodes } = require("http-status-codes"); // ✅ Correct import
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const {username,userid} = jwt.verify(token, "secret"); // Use .env in production
    req.user={username,userid};
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleware;
