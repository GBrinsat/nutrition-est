const { Schema, model } = require("mongoose");


const listSchema = new Schema(
  {
    listname: {
      type: String,
      trim: true,
      default: "My List",
    },
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food"
    }
  }
);

const List = model("List", listSchema);

module.exports = List;
