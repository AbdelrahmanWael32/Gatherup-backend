const mongoose = require("mongoose");

const eventModel = new mongoose.Schema(
  {
    image: {
      required: true,
      type: String,
    },
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
    eventCatagory: {
      required: true,
      type: String,
    },
    ticketCategories: {
      type: [
        {
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
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventModel);
