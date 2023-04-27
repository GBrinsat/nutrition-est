const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const axios = require("axios");
const User = require("../models/User.model");
const Food = require("../models/Food.model");
const List = require("../models/List.model");
const { isNotLoggedIn } = require("../middleware/route-guard");

// GET profile

router.get("/profile", isNotLoggedIn, (req, res, next) => {
    const userId = req.session.user._id;

    User.findById(userId)
    .then((userFromDB) => {
      res.render("profile", { user: userFromDB });
    })
  });

router.post("/profile/add-item", (req, res, next) => {

  const { food } = req.body;
  let user = req.session.user;

  //get fooditem from name

  axios({
    method: "post",
    url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
    data: {
      query: `${food}`,
    },
    headers: {
      "x-app-id": process.env.API_ID,
      "x-app-key": process.env.API_KEY,
      "x-remote-user-id": "0",

    },
  })
        .then(response => {

            Food.create({food_name: response.data.foods[0].food_name,
                         nf_calories: ((response.data.foods[0].nf_calories / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_total_fat: ((response.data.foods[0].nf_total_fat / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_saturated_fat: ((response.data.foods[0].nf_saturated_fat / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_cholesterol: ((response.data.foods[0].nf_cholesterol / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_sodium: ((response.data.foods[0].nf_sodium / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_total_carbohydrate: ((response.data.foods[0].nf_total_carbohydrate / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_dietary_fiber: ((response.data.foods[0].nf_dietary_fiber / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_sugars: ((response.data.foods[0].nf_sugars / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_protein: ((response.data.foods[0].nf_protein / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         nf_potassium: ((response.data.foods[0].nf_potassium / response.data.foods[0].serving_weight_grams) * 100).toFixed(2),
                         img: response.data.foods[0].photo.highres })
                          .then(createdFood => {
                            let newFood = createdFood
                            User.findById(user._id)
                              .then(foundUser => {
                                foundUser.list.push(newFood)
                                foundUser.save();
                                res.redirect("/profile");
                              })

                           
                          })  
        });
      })

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

module.exports = router;