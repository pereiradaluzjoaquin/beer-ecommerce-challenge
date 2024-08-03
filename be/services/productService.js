const products = require("../data/products");
const stockPrices = require("../data/stock-price");

const getAllProducts = () => {
  return products;
};

const getStockPriceBySku = (sku) => {
  const data = stockPrices[sku];
  return { sku, ...data };
};

module.exports = {
  getAllProducts,
  getStockPriceBySku,
};
