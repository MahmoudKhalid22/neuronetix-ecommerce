const { getUserById } = require("../dbQueries/queries");
const Product = require("../model/product");
const Table = require("../model/product");
const User = require("../model/user");
const multer = require("multer");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Table.find({ _id: productId });
    res.send(product);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const createItem = async (req, res) => {
  const isAdmin = req.user[0].role === "admin";
  if (isAdmin) {
    const product = new Product(req.body);
    try {
      await product.save();
      res.send(product);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  } else {
    res.status(400).send({ error: "You're not the admin" });
  }
};

const uploadItemImg = async (req, res) => {
  try {
    const isAdmin = req.user[0].role === "admin";
    const productId = req.params.id;
    if (!isAdmin)
      return res.status(400).send({ error: "you're not the admin" });
    const product = await Product.find({ _id: productId });
    if (!product) res.status(404).send({ error: "the product is not found" });

    const base64Data = req.file.buffer.toString("base64");
    imgsrc = `data:${req.file.mimetype};base64,${base64Data}`;
    product.img = imgsrc;
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const updateItem = async (req, res) => {
  const isAdmin = req.user[0].role === "admin";

  if (isAdmin) {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "img",
      "name",
      "imgs",
      "information",
      "price",
      "priceDiscount",
      "rate",
      "rest",
    ];

    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdates)
      return res.status(400).send({ error: "no valid update" });

    try {
      const item = await Table.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });
      if (!task) return res.status(404).send({ error: "item is not found" });

      updates.forEach((update) => (task[update] = req.body[update]));

      await item.save();
      res.send(item);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  } else {
    res.status(400).send({ error: "You're not the admin" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const isAdmin = req.user[0].role === "admin";

    if (isAdmin) {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).send({ error: "Item is not found" });
      res.send({ message: "Item has been deleted" });
    } else {
      res.status(400).send({ error: "You're not the admin" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const rateProduct = async (req, res) => {
  const user = req.user[0];
  const productId = req.params.id;
  const rate = req.body;
  if (typeof Number(rate) !== "number" || Number(rate) > 5 || Number(rate) < 1)
    return res.status(400).send({ error: "the rate must be from 1 to 5" });
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    product.rate.push({ user: user._id, rate: rate }, { new: true });
    await product.save();

    res.send({ message: "you rated the product" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const reviewProduct = async (req, res) => {
  const user = req.user[0];
  const productId = req.params.id;
  const review = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send({ error: "Product not found" });

    product.reviews.push({ user: user._id, review: review }, { new: true });
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const addToCart = async (req, res) => {
  const user = req.user[0];
  const productId = req.params.id;
  try {
    user.cart.push({ product: productId });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = req.user[0].cart;
    res.send(cart);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  createItem,
  uploadItemImg,
  updateItem,
  deleteProduct,
  rateProduct,
  reviewProduct,
  addToCart,
  getCart,
};
