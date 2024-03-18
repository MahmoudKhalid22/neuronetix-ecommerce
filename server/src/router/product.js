const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProducts,
  getOneProduct,
  createItem,
  updateItem,
  deleteProduct,
  rateProduct,
  reviewProduct,
  addToCart,
  getCart,
} = require("../controller/product");

// all users can get products
router.get("/", getProducts);

// all users can get specific product
router.get("/:id", getOneProduct);

// just admin can create - update - delete product
router.post("/create-product", auth, createItem);
router.patch("/:id", auth, updateItem);
router.delete("/:id", auth, deleteProduct);

// FOR AUTHENTICATED USER
router.post("/rate/:id", auth, rateProduct);
router.post("/review/:id", auth, reviewProduct);
router.post("/add-to-cart/:id", auth, addToCart);
router.get("/cart", auth, getCart);

module.exports = router;
