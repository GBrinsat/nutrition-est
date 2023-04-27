const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const axios = require("axios");
const User = require("../models/User.model");
const Food = require("../models/Food.model");
const { isNotLoggedIn } = require("../middleware/route-guard")

// GET profile

router.get("/profile", isNotLoggedIn, (req, res, next) => {
    const userId = req.session.user._id;

    User.findById(userId).then((userFromDB) => {
      res.render("profile", { user: userFromDB });
    })
  });

// Create new List

router.post("/profile/list", (req, res, next) => {
  const user = req.session.user;
  const { listname } = req.body;

  User.findById(user._id)
    .then((response) => {
      
      if(response.list1.length === 0) {
        response.list1.push(listname)
      } else if(response.list2.length === 0) {
        response.list2.push(listname)
      } else if(response.list3.length === 0) {
        response.list3.push(listname)
      }
      response.save();
      console.log(response)
      res.redirect("/profile");
    })
    .catch((err) => next(err));
});

router.get("/profile/list-delete", (req, res, next) => {
  document.querySelector("");
});

router.post("/profile/add-item", (req, res, next) => {

  const { food, lists } = req.body;
  let user = req.session.user;

  console.log(food)

  User.findById(user._id)
    .then(foundUser => {

      if(lists === foundUser.list1[0]) {
        console.log("push into List 1")
        foundUser.list1.push(food)
        foundUser.save()
        res.render("profile",  {user : foundUser})
      } else if(lists === foundUser.list2[0]) {
        console.log("push into List 2")
        foundUser.list1.push(food)
        foundUser.save()
        res.render("profile",  {user : foundUser})
      } else if(lists === foundUser.list3[0]) {
        console.log("push into List 3")
        foundUser.list1.push(food)
        foundUser.save()
        res.render("profile",  {user : foundUser})
      }
        
        
              /* console.log("found")
              element.food.push(food)
              foundUser.save()
              console.log(foundUser) */
            
        })
      })

  /* const { food, lists } = req.body;
  let listsArr = []
  if(typeof lists != "string") {
    console.log("not string")
    listsArr = Object.values(lists)
  } else {
      listsArr.push(lists)
    }
  console.log(listsArr)
  let user = req.session.user;

  //get fooditem from name

  axios({
    method: "post",
    url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
    data: {
      query: `${food}`,
    },
    headers: {
      "x-app-id": "03a05987",
      "x-app-key": "ac76ba904fc2089a5f7573a5f74ba3ef",
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
                            //console.log(createdFood)
                            User.findById(user._id)
                              .then(foundUser => {
                                console.log(foundUser.lists)
                                console.log(lists)
                                foundUser.lists.forEach(element => {
                                  for(let i = 0; i < listsArr.length; i++) {
                                    if(element.listname === listsArr[i]) {
                                      console.log("found")
                                      element.food.push(newFood)
                                      //console.log(element.food)
                                      //foundUser.save()
                                    }
                                  }
                                })
                                console.log(foundUser.lists)
                                foundUser.save();
                                res.render("profile", {user : foundUser});
                              })

                           
                          })  
        });*/

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