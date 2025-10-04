const {statusCodes}= require("http-status-codes")
const jwt= require("jsonwebtoken");
async function authMiddleware(req,){
     const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(statusCodes.UNAUTHORIZED).json({ msg: "No token provided" });
  }
  try {
    const {username,userid} = jwt.verify(authHeader, "secret"); 
    req.user={username,userid}
    next
    return res.status(statusCodes.OK).json({data})
} catch (error) {
    return res.status(statusCodes.UNAUTHORIZED).json({ msg: "Authentication invalid" });
  }
}
module.exports=authMiddleware;