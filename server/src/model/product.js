const mongoose = require("mongoose");
const User = require("./user");

const productSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    imgs: {
      type: Array,
    },
    information: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
      required: true,
    },
    rate: {
      type: Array,
    },
    rest: {
      type: Number,
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
