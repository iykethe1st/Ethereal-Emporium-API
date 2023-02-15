const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, no token provided");

  try {
    const decoded = jwt.verify(token, process.env.ETHEREAL_PK);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token provided");
  }
};
