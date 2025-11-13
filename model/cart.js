const mongoose = require("mongoose");

const cartModel = new mongoose.Schema(
  {
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ticket: [
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
          required: true,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartModel);
