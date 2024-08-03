import React, { useEffect, useState } from "react";
import style from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { getStockPriceBySku } from "../api/api";

export const ProductItem = ({ product }) => {
  const [stockPrices, setStockPrices] = useState([]);

  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const prices = await Promise.all(
          product.skus.map((sku) => getStockPriceBySku(sku.code))
        );
        setStockPrices(prices);
      } catch (error) {
        alert("Error fetching stock prices:", error);
      }
    };
    fetchStockPrices();
  }, [product.skus]);

  const getMinPrice = (prices) => {
    if (prices.length === 0) return 0;
    const minPrice = Math.min(...prices.map((price) => price.price));
    return (minPrice / 100).toFixed(2);
  };

  return (
    <div className={style.product}>
      <h3 className={style.title}>{product.brand}</h3>
      <img
        src={product.image}
        alt={product.brand}
        className={style.productImage}
      />
      <div className={style.productPriceContainer}>
        <p className={style.title}>${getMinPrice(stockPrices)}</p>
        <Link to={`/product/${product.id}/${product.brand}`}>
          <button className={style.button}>
            <span className={style.plus}>+</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
