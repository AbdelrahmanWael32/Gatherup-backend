/*
req incoming should be = {
    user:{
        //user id
    }
    event:{
        //added evenet details
    }
}
*/

function userRoleAuth(req, res, next) {
  const {
    user: { role },
    event,
  } = req.body;

  //   const {
  //     user: { id },
  //     event,
  //   } = req.body;
  //   const user = await User.findById(id);

  if (role == "admin") {
    req.body = event;
    next();
  } else {
    res.status(200).json({
      message: "not allowed",
      data: null,
    });
  }
}

module.exports = userRoleAuth;
