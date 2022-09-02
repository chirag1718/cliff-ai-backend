// JWT import
const jwt = require("jsonwebtoken");

// Checks if the user has token
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acces denied!");
  try {
    // token verification
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    // next() if user has the auth token 
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}
