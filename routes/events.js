const express = require("express");
const {
  get_all_events,
  get_single_event,
  add_event,
} = require("../controllers/events");
const userRoleAuth = require("../middleware/userRoleAuth");

const router = express.Router();

router.get("/", get_all_events);

router.get("/:id", get_single_event);

router.post("/", userRoleAuth, add_event);

module.exports = router;
