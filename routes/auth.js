const express = require("express");
const router = express.Router();
const {
  login,
  register,
  deleteuser,
  getOneUser,
  getAllUsers,
  updateUsers,
} = require("../controllers/auth");
const userRoleAuth = require("../middleware/userRoleAuth");
const loginAuth = require("../middleware/loginAuth");

router.post("/login", login);
router.post("/register", register);
router.delete("/delete/:id", loginAuth, deleteuser);
router.get("/user/:id", getOneUser);
router.get("/user", userRoleAuth, getAllUsers);
router.patch("/user/:id", updateUsers);

module.exports = router;
