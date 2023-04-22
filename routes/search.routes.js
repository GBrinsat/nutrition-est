const express = require('express');
const router = express.Router();
const axios = require("axios");

router.get("/search/test", (req, res, next) => {
    res.render("testSearch")
  })

// search for specific food names:
  
router.get("/search/foodItem", (req, res, next) => {

    item = req.query.test

    axios({
        method:"get",
        url:`https://trackapi.nutritionix.com/v2/search/instant?query=${item}`,
        headers: {"x-app-id": "f5eefce0", "x-app-key": "4bd59f1a91c918be3c885f59ed157eec", "x-remote-user-id": "0"}
    })
        .then(response => {
            console.log(response.data.common[0])
            res.render("searchOutput", {item : response.data.common[0]})})
        .catch(err => {next(err)})
    
})

// search for food and get its nutrients (free form text)

router.post("/search/nutrients", (req, res, next) => {

    const {item} = req.body
    console.log(item)

    axios({
        method:"post",
        url:`https://trackapi.nutritionix.com/v2/natural/nutrients`,
        data: {
            query: `${item}`
        },
        headers: {"x-app-id": "f5eefce0", "x-app-key": "4bd59f1a91c918be3c885f59ed157eec", "x-remote-user-id": "0"}
    })
        .then(response => {
            console.log(response.data.foods[0])
            res.render("searchOutput", {item : response.data.foods[0]})
        })
        .catch(err => {next(err)})
})

  module.exports = router;