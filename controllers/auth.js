const user = require("../model/user");
const bcrypt = require("bcrypt");
const sign = require("jwt-encode");
const crypto = require("crypto");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const log_user = await user.findOne({ email });

    if (!log_user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const check = await bcrypt.compare(password, log_user.password);
    if (!check) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const secrete_key = crypto.randomBytes(32).toString("hex");
    const token = sign(log_user, secrete_key);

    return res.status(200).json({
      message: "Login successful",
      data: {
        token,
        id: log_user._id,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  const { username, email, phonenumber, password, city } = req.body;

  try {
    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = new user({
      username,
      email,
      phonenumber,
      password: hashed_password,
      city,
    });

    await new_user.save();

    return res.status(200).json({
      message: "Registered successfully",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
const deleteuser = async (req, res) => {
  const { id } = req.params;

  const deleted_User = await user.findByIdAndDelete(id);

  if (!deleted_User) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "User deleted successfully",
  });
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const oneUser = await user.findById(id, { password: 0, __v: 0 });
    if (!oneUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const secrete_key = crypto.randomBytes(32).toString("hex");
    const token = sign(oneUser, secrete_key);

    return res.status(200).json({
      message: "User found",
      data: {
        token,
        id: oneUser._id,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await user.find({}, { password: 0, __v: 0 });

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.status(200).json({
      message: "Here are all users",
      data: allUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { login, register, deleteuser, getOneUser, getAllUsers };
