const express = require("express");
const router = express.Router();
const {
  add_to_cart,
  empty_cart,
  remove_from_cart,
  view_from_cart,
} = require("../controllers/cart");

router.post("/", add_to_cart);
router.get("/:userId", view_from_cart);
router.delete("/ticket", remove_from_cart);
router.delete("/empty_cart", empty_cart);

module.exports = router;
