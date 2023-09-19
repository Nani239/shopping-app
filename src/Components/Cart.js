import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import Modal from "antd/es/modal/Modal";
import { db } from "./firebase";

function Cart() {
  // const [cartItems, setCartItems] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [state, setState] = useState([]);
  const [itemRefs, setItemRefs] = useState([]); // Store Firestore document references

  const onClose = () => {
    setShowPop(false);
  };
  const fetchCartItems = async () => {
    try {
      // Create a reference to the 'cart' collection in Firestore
      const cartCollection = collection(db, "cart");

      // Fetch all documents from the 'cart' collection
      const querySnapshot = await getDocs(cartCollection);

      // Extract the cart items from the query result
      const products = querySnapshot.docs.map((doc) => doc.data());

      const refs = querySnapshot.docs.map((doc) => doc.ref);
      setItemRefs(refs);

      // Set the cartItems state to display the items
      // setCartItems(products);
      // cartItems = products;
      setState(products);
      // console.log("products in cart", cartItems);
      console.log("products", products);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  // const deleteCartItem = async (index) => {
  //   try {
  //     // const cartItemDocRef = doc(db, "cart", itemIdString);
  //     const cartItemDocRef = itemRefs[index];
  //     await deleteDoc(cartItemDocRef);

  //     // Update the cartItems state to remove the deleted item
  //     const updatedCartItems = state.filter((item, i) => i !== index);
  //     setState(updatedCartItems);
  //   } catch (error) {
  //     console.error("Error deleting cart item:", error);
  //   }
  // };

  const deleteCartItem = async (itemId) => {
    try {
      // Find the index of the item with the given itemId
      const index = state.findIndex((item) => item.id === itemId);

      if (index === -1) {
        console.error("Item not found in cart:", itemId);
        return;
      }

      // Create a reference to the Firestore document
      const cartItemDocRef = itemRefs[index];

      // Delete the Firestore document
      await deleteDoc(cartItemDocRef);

      // Update the cartItems state to remove the deleted item
      const updatedCartItems = [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
      setState(updatedCartItems);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const onOpen = () => {
    setShowPop(true);
    console.log("Clicked");
    fetchCartItems();
    console.log(state, "state");
  };
  useEffect(() => {
    console.log(state, "state");
  }, [state]);

  return (
    <div>
      <p onClick={onOpen} style={{ cursor: "pointer" }}>
        Cart
      </p>

      <Modal
        title="Basic Modal"
        onOk={onClose}
        onCancel={onClose}
        onClose={onClose}
        open={showPop}
      >
        {state.map((item, index) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <img src={item.image} alt="item" width={30} />
            {/* <button onClick={() => deleteCartItem(index)}>Delete</button> */}
            <button onClick={() => deleteCartItem(item.id)}>Delete</button>
            {/* <span>({item.count})</span>  */}
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default Cart;
