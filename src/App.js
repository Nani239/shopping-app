import React from "react";
import Header from "./Components/Header";
import Categories from "./Categories";
import { Routes, Route } from "react-router-dom";
import Purchage from "./Components/Purchage";
import MyOrders from "./Components/MyOrders";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#232F3E",
        minHeight: "100%",
      }}
    >
      <section>
        <Header />
      </section>
      <hr />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/Purchage" element={<Purchage />} />
        <Route path="/MyOrders" element={<MyOrders />} />
      </Routes>
    </div>
  );
}

export default App;
