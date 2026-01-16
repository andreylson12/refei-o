const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
