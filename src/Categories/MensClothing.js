/*eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchProductsInCategory } from "../api";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Image, Badge } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Components/firebase";

function MensClothing() {
  const [mensWear, setMensWear] = useState([]);
  const [pop, setPop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    // Fetch products with the category "electronics" when the component mounts
    fetchProductsInCategory("men's clothing")
      .then((data) => {
        setMensWear(data);
        console.log("mens clothing", data);
      })
      .catch((error) => {
        console.error("Error fetching men's clothing products:", error);
      });
  }, []);
  const handleCardClick = (mens) => {
    console.log("clicked");
    setPop(!pop);
    setSelectedProduct(mens);
  };
  const handleClose = () => {
    setPop(!pop);
  };
  const handBuy = () => {
    // Navigate to the buying page when "Buy Now" is clicked
    navigate("/Purchage");
  };
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
      {mensWear.map((mens) => (
        <Card
          key={mens.id}
          hoverable
          style={{
            margin: "16px",
            width: "300px", // Adjust the width as needed
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add box shadow
            cursor: "pointer",
          }}
          cover={
            <img
              style={{
                width: "100%",
                height: "200px", // Adjust the height as needed
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                objectFit: "cover",
              }}
              alt={mens.title}
              src={mens.image}
            />
          }
          onClick={() => handleCardClick(mens)} // Handle card click
        >
          <Meta
            title={mens.title}
            description={`Price: $${mens.orice}`}
            style={{ textAlign: "center" }}
          />
          <Button
            type="danger"
            onClick={() => addToCart(mens)}
            style={{ textAlign: "center" }}
          >
            Add to Cart
          </Button>
        </Card>
      ))}
      {pop && (
        <div>
          <Modal
            visible={true}
            onCancel={handleClose}
            width={300}
            footer={null} // Remove the footer for a cleaner look
          >
            <div
              style={{
                padding: "16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                preview={false}
                className="modal-image"
                src={selectedProduct?.image}
                width={100}
                style={{ marginBottom: "16px" }}
              />
              <hr style={{ margin: "16px 0" }} />
              <h2 style={{ fontSize: "1.5rem" }}>{selectedProduct?.title}</h2>
              <p style={{ fontSize: "1.2rem", color: "blue" }}>
                Price: ${selectedProduct?.price}
              </p>
              <Badge
                count={"In Stock"}
                showZero
                style={{ marginBottom: "16px" }}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  onClick={handBuy}
                  style={{ marginRight: "8px" }}
                >
                  Buy Now
                </Button>
                <Button
                  type="default"
                  size="large"
                  shape="round"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default MensClothing;
