/*
req incoming should be = {
    userId:{
        //user id
    }
    event:{
        //added evenet details
    }
}
*/

const User = require("../model/user");

const userRoleAuth = async (req, res, next) => {
  const {
    user: { role },
    event,
  } = req.body;

  //   const {
  //     userId,
  //     event,
  //   } = req.body;
  //   const user = await User.findById(id);
  //   const { role } = user;
  //   if (!user) {
  //     return res.status(200).json({
  //       message: "user not found",
  //       data: null,
  //     });
  //   }

  if (role == "admin") {
    req.body = event;
    next();
  } else {
    res.status(200).json({
      message: "not allowed",
      data: null,
    });
  }
};

module.exports = userRoleAuth;
