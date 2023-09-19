import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts()
      .then((data) => {
        setProducts(data);
        console.log(data, "Products");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product) => (
        <Card
          key={product.id}
          hoverable
          style={{
            margin: "16px",
            width: "10vw",
            height: "200px",
            borderRadius: "12px",
            transition: "box-shadow 0.5s", // Add transition effect
          }}
          cover={
            <img
              style={{
                width: "7vw",
                height: "150px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                objectFit: "cover",
              }}
              alt={product.name}
              src={product.image}
            />
          }
          //   onClick={() => handleCardClick(movie)} // Handle card click
        >
          <Meta
            title={product.title}
            // description={`Release Date: ${product.description}`}
          />
          <p style={{ margin: "0", padding: "0", color: "blue" }}>
            {" "}
            Price : {product.price}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default Products;
