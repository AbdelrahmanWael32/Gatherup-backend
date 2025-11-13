const express = require("express");
const router = express.Router();
const {
  login,
  register,
  deleteuser,
  getOneUser,
  getAllUsers,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.delete("/delete/:id", deleteuser);
router.get("/user/:id", getOneUser);
router.get("/user", getAllUsers);

module.exports = router;
