import Search from "antd/es/input/Search";
import React from "react";
import Cart from "./Cart";
// import {ShoppingCartOutlined} from 'antd'

function Header() {
  return (
    <div>
      <header
        className="bg-white shadow"
        style={{ display: "flex", color: "#fff", padding: "0px" }}
      >
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon"
          width={100}
          style={{ padding: "20px" }}
        />
        <p>
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
        <p>
          <span>Hello, Signin</span>
          <br />
          <strong>Accounts & Lists</strong>
        </p>
        <p style={{ paddingLeft: "30px" }}>
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
