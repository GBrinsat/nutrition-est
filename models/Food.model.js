const { Schema, model } = require("mongoose");


const foodSchema = new Schema(
  {
    food_name: {
      type: String,
      required: true
    },
    nf_calories: Number,
    nf_total_fat: Number,
    nf_saturated_fat: Number,
    nf_cholesterol: Number,
    nf_sodium: Number,
    nf_total_carbohydrate: Number,
    nf_dietary_fiber: Number,
    nf_sugars: Number,
    nf_protein: Number,
    nf_potassium: Number,
    img: String
  }
);

const Food = model("Food", foodSchema);

module.exports = Food;
