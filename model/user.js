const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: [true, "user already exist ,try to login"],
    },

    phonenumber: {
      required: true,
      type: Number,
    },

    password: {
      required: true,
      type: String,
    },

    city: {
      required: true,
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);