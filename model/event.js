const mongoose = require("mongoose");

const ticketCategorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
  },
});

const eventModel = new mongoose.Schema(
  {
    title: {
      required: true,
      unique: true,
      type: String,
    },
    description: {
      default: "Event description",
      type: String,
    },
    date: {
      required: true,
      type: String,
    },
    time: {
      default: "Event time",
      type: String,
    },
    location: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    ticketCategories: {
      type: [ticketCategorySchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventModel);
