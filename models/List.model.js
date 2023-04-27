const { Schema, model } = require("mongoose");


const listSchema = new Schema(
  {
    listname: String,
    food: Array
  }
, false);

const List = model("List", listSchema);

module.exports = List;
