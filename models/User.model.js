const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      required: false,
    },
    lastname: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: false
    },
    preferences: [
      {
      type: String,
      enum: [ "vegetarian", "vegan", "gluten-free", "lactose-intolerant", "paleo", "diabetes", "none" ],
      required: false
    }
  ],
    list: Array,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
, false);

const User = model("User", userSchema);

module.exports = User;