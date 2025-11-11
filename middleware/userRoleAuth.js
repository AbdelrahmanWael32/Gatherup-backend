const jwt = require("jsonwebtoken");

const userRoleAuth = async (req, res, next) => {
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
    const { role } = decoded;
    req.user = decoded;

    if (role == "admin") {
      return next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "access denied",
        data: null,
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: error,
      data: null,
    });
  }
};

module.exports = userRoleAuth;
