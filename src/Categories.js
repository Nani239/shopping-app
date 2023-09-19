import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "antd";
import Products from "./Components/Products";
import Jewelery from "./Categories/Jewelery";
import MensClothing from "./Categories/MensClothing";
import WomensClothing from "./Categories/WomensClothing";
import Electronics from "./Categories/Electronics";
// import { StoreProvider } from "./StoreContext";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("products");

  // Function to set the selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          backgroundColor: "37475A",
          justifyContent: "space-evenly",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        <p onClick={() => handleCategoryChange("mens-clothing")}>
          MensClothing
        </p>
        <br />
        <p onClick={() => handleCategoryChange("jewelery")}>Jewelery </p>
        <br />
        <p onClick={() => handleCategoryChange("womens-clothing")}>
          WomensClothing{" "}
        </p>
        <br />
        <p onClick={() => handleCategoryChange("electronics")}>Electronics </p>
        <br />
      </div>
      <div>
        {selectedCategory === "products" && <Products />}
        {selectedCategory === "electronics" && <Electronics />}
        {selectedCategory === "jewelery" && <Jewelery />}
        {selectedCategory === "mens-clothing" && <MensClothing />}
        {selectedCategory === "womens-clothing" && <WomensClothing />}
        {/* <StoreProvider /> */}
      </div>
    </div>
  );
}

export default Categories;
