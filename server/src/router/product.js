const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

// all users can get products
router.get("/", getProducts);

// all users can get specific product
router.get("/:id", getOneProduct);

// just admin can create - update - delete product
router.post("/create-product", auth, createProduct);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
