const productService = require("../services/productService");

const getAllProducts = (req, res, next) => {
  try {
    const products = productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getStockPriceBySku = (req, res, next) => {
  try {
    const { sku } = req.params;
    const stockPrice = productService.getStockPriceBySku(sku);
    if (stockPrice) res.json(stockPrice);
    else res.status(404).json({ message: "SKU not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getStockPriceBySku,
};
