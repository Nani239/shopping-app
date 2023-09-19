/*eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchProductsInCategory } from "../api";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
// import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Components/firebase";
function Jewelery() {
  const [jewelery, setJewelery] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products with the category "electronics" when the component mounts
    fetchProductsInCategory("jewelery")
      .then((data) => {
        setJewelery(data);
        console.log("jewelery");
      })
      .catch((error) => {
        console.error("Error fetching jewelery products:", error);
      });
  }, []);
  const addToCart = async (item) => {
    try {
      // Create a reference to the 'cart' collection in Firestore
      const cartCollection = collection(db, "cart");

      // Create a new document with the selected item data in the 'cart' collection
      await addDoc(cartCollection, item);

      console.log("Item added to cart:", item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {jewelery.map((jelr) => (
        <Card
          key={jelr.id}
          hoverable
          style={{
            margin: "16px",
            width: "10vw",
            height: "200px",
            borderRadius: "12px",
            transition: "box-shadow 0.5s", // Add transition effect
            justifyContent: "center", // Center items vertically
            alignItems: "center", // Center items horizontally
            alignContent: "center",
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
              alt={jelr.title}
              src={jelr.image}
            />
          }
          //   onClick={() => handleCardClick(movie)} // Handle card click
        >
          <Meta
            title={jelr.title}
            // description={`Release Date: ${product.description}`}
          />
          <p style={{ margin: "0", padding: "0", color: "blue" }}>
            {" "}
            Price : {jelr.price}
          </p>
          <button onClick={() => addToCart(jelr)}>Add to Cart</button>
        </Card>
      ))}
    </div>
  );
}

export default Jewelery;
