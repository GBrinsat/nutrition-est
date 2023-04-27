const { Schema, model } = require("mongoose");


const listSchema = new Schema(
  {
    listname: {
    type: String,
    default: "My favourites: "
    },
    food: Array
  }
, false);

const List = model("List", listSchema);

module.exports = List;
