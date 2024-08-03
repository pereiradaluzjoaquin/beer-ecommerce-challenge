const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:sku", productController.getStockPriceBySku);

module.exports = router;
