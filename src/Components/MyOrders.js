import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Card, Rate } from "antd";
import { db } from "./firebase";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [productRatings, setProductRatings] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const querySnapshot = await getDocs(ordersCollection);
        const ordersData = querySnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleRatingChange = (productId, newRating) => {
    setProductRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: newRating,
    }));
  };

  return (
    <div className="my-orders-container">
      <h1 className="my-orders-title">My Orders</h1>
      <ul className="order-list">
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <Card key={order.id} title="Order" hoverable className="order-card">
              {order.products &&
                order.products.length > 0 &&
                order.products.map((product, productIndex) => (
                  <div key={productIndex} className="product-info">
                    <div className="product-image">
                      <img src={product.image} alt="order" />
                    </div>
                    <div className="product-details">
                      <h4 className="product-title">{product.title}</h4>
                      <div className="product-rating">
                        <span className="rating-text">Rating:</span>
                        <Rate
                          onChange={(newRating) =>
                            handleRatingChange(product.id, newRating)
                          }
                          value={productRatings[product.id] || 0}
                          allowHalf
                        />
                      </div>
                    </div>
                  </div>
                ))}
              <div className="order-details">
                <div className="order-info">
                  Order placed
                  <br />
                  {order.dateTime}
                </div>
                <div className="order-info">
                  Total
                  <br />${order.totalPrice}
                </div>
                <div className="order-info">
                  Ship To
                  <br />
                  {order.address}
                </div>
                <div className="order-info">
                  items
                  <br />
                  {order.numberOfItems}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </div>
  );
}

export default MyOrders;
