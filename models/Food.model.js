const { Schema, model } = require("mongoose");


const foodSchema = new Schema(
  {
    food_name: {
      type: String,
      required: true
    },
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food"
    }
  }
);

const List = model("List", listSchema);

module.exports = List;
