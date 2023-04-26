const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User.model");

router.get("/search", (req, res, next) => {
  const user = req.session.user
  res.render("search", { user });
});

// search for specific food names:

router.get("/search/foodItem", (req, res, next) => {
  item = req.query.item;

  axios({
    method: "get",
    url: `https://trackapi.nutritionix.com/v2/search/instant?query=${item}&detailed=true`,
    headers: { "x-app-id": "03a05987", "x-app-key": "ac76ba904fc2089a5f7573a5f74ba3ef", "x-remote-user-id": "0" },
  })
    .then((response) => {
      let foodArr = [];
      foodArr = response.data.common;
      //console.log(foodArr)
      console.log(foodArr[0].full_nutrients);
      res.render("search", { items: foodArr });
    })
})

// search for food and get its nutrients (free form text) and calculate for 100grams

router.post("/search/nutrients", (req, res, next) => {
  const user = req.session.user;
  const { item } = req.body;
  let food = null;
  let nutrientsArr = [];

  axios({
    method: "post",
    url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
    data: {
      query: `${item}`,
    },
    headers: {
      "x-app-id": "03a05987",
      "x-app-key": "ac76ba904fc2089a5f7573a5f74ba3ef",
      "x-remote-user-id": "0",
    },
  })
    .then((response) => {
      food = null;
      food = response.data.foods;
      foodName = response.data.foods[0].food_name;
      foodPhoto = response.data.foods[0].photo.highres;
      console.log(foodPhoto);

      const calories = [(response.data.foods[0].nf_calories / response.data.foods[0].serving_weight_grams) * 100];
      const nutrients = [
        (response.data.foods[0].nf_total_fat / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_saturated_fat / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_cholesterol / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_sodium / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_total_carbohydrate / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_sugars / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_dietary_fiber / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_protein / response.data.foods[0].serving_weight_grams) * 100,
        (response.data.foods[0].nf_potassium / response.data.foods[0].serving_weight_grams) * 100,
      ];
      //  (response.data.foods[0].nf_p / response.data.foods[0].serving_weight_grams) * 100]

      roundedNutrients = nutrients.map((element) => element.toFixed(2));
      caloriesAndNutrients = calories.concat(roundedNutrients);
      console.log(roundedNutrients);
      // console.log(foodPhoto);
    })
    .then(() => {
      User.findById(user._id).then((response) => {
        //console.log(food)
        res.render("details", { items: food, user: response, nutrients: caloriesAndNutrients, foodName, foodPhoto });
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
