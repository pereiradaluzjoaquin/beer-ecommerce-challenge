import React, { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import style from "./ProductList.module.css";
import { getAllProducts } from "../api/api";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((products) => setProducts(products));
  }, []);
  return (
    <>
      <h3 classname={style.productsTitle}>Our Products</h3>
      <div className={style.container}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
