const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.user
  res.render("index", { user });
});

module.exports = router;
