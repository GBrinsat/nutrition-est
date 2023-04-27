const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

/* GET about page */
router.get("/about", (req, res, next) => {
  const user = req.session.user;
  res.render("about", { user });
});

module.exports = router;
