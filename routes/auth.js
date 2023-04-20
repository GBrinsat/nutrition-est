const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/auth/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/auth/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (username === "") {
    res.render("signup", { message: "Username cannot be empty" });
    return;
  }

  if (password.length < 4) {
    res.render("signup", { message: "Password must be 4 or more characters" });
    return;
  }

  User.findOne({ username }).then((userFromDB) => {
    console.log(userFromDB);
    if (userFromDB !== null) {
      res.render("signup", { message: "Username is already taken" });
    } else {
      // Username is available
      // Hash password
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      console.log(hash);

      User.create({ username: username, password: hash })
        .then((createdUser) => {
          console.log(createdUser);
          res.redirect("/login");
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username }).then((userFromDB) => {
    if (userFromDB === null) {
      // User not found in database => show login form
      res.render("login", { message: "Invalid credentials " });
      return;
    }

    // User found in database
    // Check if password from input form matches hashed password from database
    if (bcrypt.compareSync(password, userFromDB.password)) {
      // Password is correct => Login user
      // req.session is an object provided by "express-session"
      let user = {
        _id: userFromDB._id,
        name: userFromDB.username,
      };
      req.session.user = user;
      req.session.user.password = null;
      res.redirect("/profile");
    } else {
      res.render("login", { message: "Wrong credentials" });
      return;
    }
  });
});

// router.get("/logout", ) + destroy() session here

module.exports = router;
