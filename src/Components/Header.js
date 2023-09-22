/*eslint-disable no-unused-vars */
import Search from "antd/es/input/Search";
import React from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); // Initialize useHistory
  const handleOrdersClick = () => {
    console.log("my Orders clicked");
    navigate("/MyOrders");
  };

  return (
    <div>
      <header
        className="bg-white shadow"
        style={{ display: "flex", color: "#fff", padding: "0px" }}
      >
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon"
          width={120}
          style={{ padding: "20px", cursor: "pointer" }}
        />
        <p style={{ cursor: "pointer" }}>
          <span>Hello</span>
          <br />
          <strong>Select the adress</strong>
        </p>
        <Search
          placeholder="Search for product"
          //   onSearch={onSearch}
          enterButton
          size="large"
          style={{
            width: "50%",
            height: "100%",
            margin: "15px",
            paddingLeft: "30px",
          }}
        />
        <p style={{ cursor: "pointer" }}>
          <span>Hello, Signin</span>
          <br />
          <strong>Accounts & Lists</strong>
        </p>
        <p
          style={{ paddingLeft: "30px", cursor: "pointer" }}
          onClick={handleOrdersClick}
        >
          <span>returns</span>
          <br />
          <strong>& Orders</strong>
        </p>
        <Cart />
      </header>
    </div>
  );
}

export default Header;
