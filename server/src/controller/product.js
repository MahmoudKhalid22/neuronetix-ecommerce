const { getUserById } = require("../dbQueries/queries");
const Product = require("../model/product");
const Table = require("../model/product");

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

module.exports = {
  getProducts,
  getOneProduct,
  createItem,
  updateItem,
  deleteProduct,
};
