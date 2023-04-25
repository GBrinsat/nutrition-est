const express = require("express");
const router = express.Router();
const User = require("../models/User.model")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  const user = req.session.user;

  User.findById(user._id)
    .then(response => {
      res.render("profile", { user: response });
    })

});

module.exports = router;
