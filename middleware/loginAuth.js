const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "no token",
      data: null,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: error,
      data: null,
    });
  }
};

module.exports = loginAuth;
