import React from "react";
import Header from "./Components/Header";
import Categories from "./Categories";
import { Routes, Route } from "react-router-dom";
import Purchage from "./Components/Purchage";
// import Cart from "./Components/Cart";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#232F3E", // Amazon's background color
        minHeight: "100%",
      }}
    >
      <section>
        <Header />
      </section>
      <hr />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/Purchase" element={<Purchage />} />
      </Routes>
    </div>
  );
}

export default App;
