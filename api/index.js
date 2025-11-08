require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.port || 7000;

const eventsRoute = require("../routes/events");

app.use("/api/v1/events", eventsRoute);

app.use((req, res) => {
  res.status(400).json({
    message: "invalid route",
    data: null,
  });
});

app.listen(port, () => {
  console.log("server is running");
});

module.exports = app;
