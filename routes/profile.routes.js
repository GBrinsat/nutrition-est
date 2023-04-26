const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const Food = require("../models/Food.model");
const { isNotLoggedIn } = require("../middleware/route-guard")

// GET profile

router.get("/profile", isNotLoggedIn, (req, res, next) => {
    const userId = req.session.user._id;

    User.findById(userId).then((userFromDB) => {
        console.log(userFromDB)
      res.render("profile", { user: userFromDB });
    })
  });

// Create new List

router.post("/profile/list", (req, res, next) => {
  const user = req.session.user;
  const { listname } = req.body;
  const newList = { listname: listname, food: [] };

  User.findById(user._id)
    .then((response) => {
      response.lists.push(newList);
      response.save();
      res.redirect("/profile");
    })
    .catch((err) => next(err));
});

router.get("/profile/list-delete", (req, res, next) => {
  document.querySelector("");
});

router.get("/profile/add-item", (req, res, next) => {
  const { food_name } = req.body;
  console.log("test starts here");
  console.log(req.body);
  res.redirect("/profile");
});

module.exports = router;

// Edit profile

router.post("/profile", (req, res, next) => {
    const { firstname, lastname, username, email, password, preferences } = req.body;
    const userId = req.session.user._id;

    // If password too short, error message
    // if (password && password.length < 4) { 
    // }

    // Hash new password
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    User.findByIdAndUpdate(userId, { username: username, firstname: firstname, lastname: lastname, email: email, password: hash, preferences: preferences }, { new:true }).then((userFromDB) => {
      res.render("profile", { user: userFromDB });
    })
    .catch (err => next(err))
})