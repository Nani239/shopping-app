import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api";
import { Card, Modal, Button, Image, Badge, Rate } from "antd";
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";

function Products() {
  const [products, setProducts] = useState([]);
  const [pop, setPop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts()
      .then((data) => {
        // Generate random ratings for each product
        const productsWithRandomRatings = data.map((product) => ({
          ...product,
          rating: generateRandomRating(),
        }));

        setProducts(productsWithRandomRatings);
        console.log(productsWithRandomRatings, "Products with Ratings");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleCardClick = (product) => {
    console.log("clicked");
    setPop(!pop);

    setSelectedProduct(product);
  };
  const handleClose = () => {
    setPop(!pop);
  };
  const handBuy = () => {
    // Navigate to the buying page when "Buy Now" is clicked
    navigate("/Purchage", { state: { selectedProduct: [selectedProduct] } });
  };

  const addToCart = async (item) => {
    try {
      const cartCollection = collection(db, "cart");
      const querySnapshot = await getDocs(cartCollection);
      const cartItems = querySnapshot.docs.map((doc) => doc.data());
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        const updatedQuantity = existingItem.quantity + 1;
        const existingCartItemRef = querySnapshot.docs.find(
          (doc) => doc.data().id === existingItem.id
        ).ref;
        await updateDoc(existingCartItemRef, { quantity: updatedQuantity });
        console.log("Item quantity updated:", item);
      } else {
        await addDoc(cartCollection, { ...item, quantity: 1 });
        console.log("Item added to cart:", item);
      }
    } catch (error) {
      console.error("Error updating/adding item to cart:", error);
    }
  };

  // Function to generate a random rating between 0 and 5
  const generateRandomRating = () => {
    return Math.random() * 5;
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product) => (
        <Card
          key={product.id}
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
              alt={product.name}
              src={product.image}
            />
          }
          onClick={() => handleCardClick(product)} // Handle card click
        >
          <Meta
            title={product.title}
            description={`Price: $${product.price}`}
            style={{ textAlign: "center" }}
          />
          <Rate allowHalf defaultValue={product.rating} />
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
              <Rate allowHalf defaultValue={selectedProduct?.rating} />
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

export default Products;
