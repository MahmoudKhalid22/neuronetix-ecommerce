const mongoose = require("mongoose");
const User = require("./user");

const productSchema = new mongoose.Schema(
  {
    img: {
      type: Buffer,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgs: {
      type: Array,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rate: {
      type: Boolean,
      required: true,
    },
    rest: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
