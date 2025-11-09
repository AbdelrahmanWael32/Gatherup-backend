require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const eventsRoute = require("../routes/events");

const port = process.env.port || 7000;
const LINK = process.env.DB_link;

const app = express();

mongoose
  .connect(LINK)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Down");
    console.log(err);
  });

app.use("/api/v1/events", eventsRoute);

app.use((req, res) => {
  res.status(400).json({
    message: "invalid route",
    data: null,
  });
});

app.listen(port, () => {
  console.log("Server is running");
});

module.exports = app;
