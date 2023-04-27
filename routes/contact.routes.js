const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

/* GET contact page */
router.get("/contact", (req, res, next) => {
  const user = req.session.user;
  res.render("contact", { user });
});

module.exports = router;
