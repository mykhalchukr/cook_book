const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ingredients: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  directions: {
    type: String,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
  // forks: {
  //   type: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  // },
});

module.exports = model("Recipe", schema);
