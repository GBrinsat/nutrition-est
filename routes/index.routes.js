const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isNotLoggedIn } = require("../middleware/route-guard")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isNotLoggedIn, (req, res, next) => {
  const userId = req.session.user._id;
  User.findById(userId).then((userFromDB) => {
    res.render("profile", { user: userFromDB });
  })
});

module.exports = router;
