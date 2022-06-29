const mongoose = require("mongoose");

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "categories" }
);

const model = mongoose.model("categoryName", Category);

module.exports = model;
