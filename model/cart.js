const mongoose = require("mongoose");

const cartModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Events",
          required: true,
        },
        ticketCategory: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartModel);
