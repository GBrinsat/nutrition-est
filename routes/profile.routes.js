const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Food = require("../models/Food.model");

// Create new List

router.post("/profile/list", (req, res, next) => {

    const user = req.session.user;
    const {listname} = req.body
    const newList = {listname: listname, food: []}

            User.findById(user._id)
                .then(response => {
                    response.lists.push(newList)
                    response.save()
                    res.redirect("/profile")
                })
        .catch(err => next(err))
})

router.get("/profile/list-delete", (req, res, next) => {

    document.querySelector("")
})

router.get("/profile/add-item", (req, res, next) => {
    const {food_name} = req.body
    console.log("test starts here")
    console.log(req.body)
    res.redirect("/profile")
})

module.exports = router;
