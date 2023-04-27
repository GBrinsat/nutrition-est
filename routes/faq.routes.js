const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

/* GET FAQ page */
router.get("/faq", (req, res, next) => {
  const user = req.session.user;
  res.render("faq", { user });
});

module.exports = router;
