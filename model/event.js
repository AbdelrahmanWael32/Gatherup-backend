const mongoose = require("mongoose");
const { type } = require("os");

const eventModel = new mongoose.Schema(
  {
    title: {
      required: true,
      unique: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    description: {
      default: "Event description",
      type: String,
    },
    date: {
      required: true,
      type: String,
    },
    location: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventModel);
