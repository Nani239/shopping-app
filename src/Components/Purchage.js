import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Components/firebase";
import { Row, Col, Card, Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

const PaymentMethods = ["Credit Card", "PayPal", "Cash on Delivery"];

function Purchage() {
  const { state } = useLocation();
  const [count, setCount] = useState(1);
  const selectedProducts = Array.isArray(state?.selectedProduct)
    ? state.selectedProduct
    : [];

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });

  const orderTotal = selectedProducts.reduce(
    (total, product) => total + product.price * count,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const handlePaymentMethodChange = (value) => {
    setDeliveryInfo({ ...deliveryInfo, paymentMethod: value });
  };

  const decreaseQuantity = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseQuantity = () => {
    setCount(count + 1);
  };

  const handlePurchase = async () => {
    try {
      const currentDateTime = new Date();
      const formattedDateTime = currentDateTime.toISOString();
      const productsWithInfo = selectedProducts.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        rating: product.rating,
      }));

      const orderData = {
        name: deliveryInfo.name,
        address: deliveryInfo.address,
        paymentMethod: deliveryInfo.paymentMethod,
        numberOfItems: count,
        totalPrice: orderTotal,
        dateTime: formattedDateTime,
        products: productsWithInfo,
      };
      console.log("selectedProducts.title", selectedProducts.title);
      console.log(orderData, "orderData");
      const ordersCollection = collection(db, "orders");
      await addDoc(ordersCollection, orderData);
      setTimeout(() => {
        message.success("Order placed successfully!");
      }, 5000);
    } catch (error) {
      console.error("Error adding order to Firestore:", error);
      message.error("Error placing the order. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Order Summary" style={{ marginBottom: "16px" }}>
            {selectedProducts.map((product, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <Row gutter={16}>
                  <Col span={6}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={18}>
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                  </Col>
                </Row>
              </div>
            ))}
          </Card>
          <Card title="Payment Method" style={{ marginBottom: "16px" }}>
            <Form>
              <Form.Item label="Name">
                <Input
                  name="name"
                  value={deliveryInfo.name}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Delivery Address">
                <Input.TextArea
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Payment Method">
                <Select
                  placeholder="Select a payment method"
                  onChange={handlePaymentMethodChange}
                  value={deliveryInfo.paymentMethod}
                >
                  {PaymentMethods.map((method, index) => (
                    <Option key={index} value={method}>
                      {method}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={handlePurchase}
                  style={{ width: "100%" }}
                >
                  Place Your Order
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Order Total">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button onClick={decreaseQuantity}>-</Button>
              <h3 style={{ margin: "0 8px" }}>{count}</h3>
              <Button onClick={increaseQuantity}>+</Button>
            </div>
            <p>
              Order Total:{" "}
              <span style={{ color: "blue" }}>${orderTotal.toFixed(2)}</span>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Purchage;
