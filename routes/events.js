const express = require("express");
const { get_all_events, get_single_event } = require("../controllers/events");

const router = express.Router();

router.get("/", get_all_events);

router.get("/:id", get_single_event);

module.exports = router;
