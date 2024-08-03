import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import style from "./App.module.css";
import { ProductList } from "./components/ProductList";
import { ProductDetails } from "./components/ProductDetails";

function App() {
  return (
    <div className={style.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <h3 className={style.userTitle}>Hi Mr. Michael,</h3>
                <h1 className={style.subtitle}>Welcome Back!</h1>
                <ProductList />
              </>
            }
          />
          <Route
            path="/product/:productId/:productBrand" //"/product/:productId-:productBrand" Does not work
            element={<ProductDetails />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
