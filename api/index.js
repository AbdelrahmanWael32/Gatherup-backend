require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const eventsRoute = require("../routes/events");
const authRoute = require("../routes/auth");

const port = 7000;
const LINK = process.env.DB_link;

const app = express();
app.use(express.json());

app.use(express.json());

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
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to home",
  });
});

app.use((req, res) => {
  res.status(400).json({
    message: "invalid route",
    data: null,
  });
});

app.listen(port, () => {
  console.log("Server is running on port" + port);
});

module.exports = app;
