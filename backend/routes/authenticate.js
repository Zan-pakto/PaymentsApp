const { jwtsecret } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "error in token",
    });
  }
  const token = authHeader.split(" ")[1]?.trim();
  console.log(token);

  try {
    const decoded = jwt.verify(token, jwtsecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "sdajfkljsa",
    });
  }
};

module.exports = authMiddleware;
