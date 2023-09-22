/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import Modal from "antd/es/modal/Modal";
import { db } from "./firebase";
import { Button, List, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

function Cart() {
  const [showPop, setShowPop] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemRefs, setItemRefs] = useState([]);

  const onClose = () => {
    setShowPop(false);
  };
// fetch items from cart collection in firebase-db added from products
  const fetchCartItems = async () => {
    try {
      const cartCollection = collection(db, "cart");
      const querySnapshot = await getDocs(cartCollection);
      const products = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });

      const refs = querySnapshot.docs.map((doc) => doc.ref);
      setItemRefs(refs);
      setCartItems(products);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const index = cartItems.findIndex((item) => item.id === itemId);
      if (index === -1) {
        console.error("Item not found in cart:", itemId);
        return;
      }
      const cartItemDocRef = itemRefs[index];
      await deleteDoc(cartItemDocRef);
      const updatedCartItems = [
        ...cartItems.slice(0, index),
        ...cartItems.slice(index + 1),
      ];
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const index = cartItems.findIndex((item) => item.id === itemId);
      if (index === -1) {
        console.error("Item not found in cart:", itemId);
        return;
      }
      const cartItemDocRef = itemRefs[index];
      await updateDoc(cartItemDocRef, {
        quantity: newQuantity,
      });
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const increaseQuantity = (itemId) => {
    const index = cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity += 1;
      updateQuantity(itemId, updatedCartItems[index].quantity);
    }
  };

  const decreaseQuantity = (itemId) => {
    const index = cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1 && cartItems[index].quantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity -= 1;
      updateQuantity(itemId, updatedCartItems[index].quantity);
    }
  };

  const onOpen = () => {
    setShowPop(true);
    fetchCartItems();
  };

  useEffect(() => {
    console.log(cartItems, "cartItems");
  }, [cartItems]);

  return (
    <div>
      <div
        style={{ cursor: "pointer", display: "flex", paddingLeft: "20px" }}
        onClick={onOpen}
      >
        <ShoppingCartOutlined style={{ fontSize: "40px" }} />
        <p style={{ fontSize: "1.2rem" }}>Cart</p>
      </div>

      <Modal
        title="Shopping Cart"
        visible={showPop}
        onOk={onClose}
        onCancel={onClose}
      >
        <List
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Button type="danger" onClick={() => deleteCartItem(item.id)}>
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Image src={item.image} alt="item" width={50} />}
                title={item.title}
                description={
                  <div>
                    <p>{`Price: $${item.price}`}</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </Button>
                      <h3 style={{ margin: "0 8px" }}>{item.quantity}</h3>
                      <Button onClick={() => increaseQuantity(item.id)}>
                        +
                      </Button>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}

export default Cart;
