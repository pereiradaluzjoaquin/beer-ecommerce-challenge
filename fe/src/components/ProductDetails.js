import React, { useState, useEffect } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { getAllProducts, getStockPriceBySku } from "../api/api";

export const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [stockPrice, setStockPrice] = useState([]);
  const [price, setPrice] = useState(0);
  const [skuName, setSkuName] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const products = await getAllProducts();
        const foundProduct = products.find(
          (product) => product.id === parseInt(productId)
        );
        if (foundProduct) {
          setProduct(foundProduct);
          const stockPrices = await Promise.all(
            foundProduct.skus.map(async (element) => {
              const data = await getStockPriceBySku(element.code);
              console.log("data", data);
              return data;
            })
          );
          setStockPrice(stockPrices);
          const minPrice = Math.min(...stockPrices.map((sp) => sp.price));
          setPrice(minPrice);
        }
      } catch (error) {
        alert("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product && stockPrice.length) {
      const activeSku = product.skus.find((sku) => {
        const skuPrice = stockPrice.find((sp) => sp.sku === sku.code)?.price;
        return skuPrice === price;
      });
      if (activeSku) {
        setSkuName(activeSku.name);
      }
    }
  }, [price, product, stockPrice]);

  const DetailsNav = () => {
    return (
      <nav className={style.navbar}>
        <Link to="/products">
          <img src="/icons/icon-back.png" alt="Back" className={style.icon} />
        </Link>
        <h3 className={style.detailTitle}>Detail</h3>
        <img src="/icons/icon-dots.png" alt="More" className={style.icon} />
      </nav>
    );
  };

  const skusNames = () => {
    return (
      <div className={style.sizes}>
        {product.skus.map((sku) => {
          const skuPrice = stockPrice.find((sp) => sp.sku === sku.code)?.price;
          const isActive = skuPrice === price;
          return (
            <p
              key={sku.code}
              className={`${style.skuName} ${isActive ? style.activeSku : ""}`}
              onClick={() => {
                setPrice(skuPrice);
              }}
            >
              {sku.name}
            </p>
          );
        })}
      </div>
    );
  };

  const getStockByPrice = (price) => {
    const stockData = stockPrice.find((sp) => sp.price === price);
    return stockData ? stockData.stock : "N/A";
  };

  const handleAddToCart = () => {
    alert(
      `Added to cart: ${product.brand} - ${skuName} - $${(price / 100).toFixed(
        2
      )}`
    );
  };

  return (
    <div>
      <DetailsNav />
      {product && (
        <div className={style.container}>
          <img
            src={product.image}
            alt={product.brand}
            className={style.image}
          />
          <div className={`${style.brandPrice} ${style.brandTitle}`}>
            <h3>{product.brand}</h3>
            <p className={style.price}>${(price / 100).toFixed(2)}</p>
          </div>
          <p className={style.originStock}>
            Origin: {product.origin} | Stock:{" "}
            {price !== null ? getStockByPrice(price) : "N/A"}
          </p>
          <h5 className={style.descriptionTitle}>Description</h5>
          <p className={style.description}>{product.information}</p>
          <h5 className={style.descriptionTitle}>Size</h5>
          {skusNames()}
          <div className={style.cartButtons}>
            <button className={style.addToBag} onClick={() => alert("Added!")}>
              <img src="/icons/icon-bag.png" alt="Bag" />
            </button>
            <button className={style.addToCart} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
