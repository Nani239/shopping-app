import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "antd";
import { db } from "./firebase";

function MyOrders() {
  const [orders, setOrders] = useState([]);
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

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <Card
              key={order.id}
              title="order"
              hoverable
              style={{ width: "80%" }}
            >
              {order.products &&
                order.products.length > 0 &&
                order.products.map((product, productIndex) => (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        Order placed
                        <br />
                        {order.dateTime}
                      </div>
                      <div>
                        Total
                        <br />${order.totalPrice}
                      </div>
                      <div>
                        Ship To
                        <br />
                        {order.address}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <img src={product.image} alt="order" width={50} />
                      <h4>{product.title}</h4>
                    </div>
                  </div>
                ))}
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
