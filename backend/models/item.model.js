const mongoose = require("mongoose");

const Item = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "items" }
);

const model = mongoose.model("itemName", Item);

module.exports = model;
