import React from "react";
import Header from "./Components/Header";
import Categories from "./Categories";
import Cart from "./Components/Cart";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#232F3E", // Amazon's background color
        minHeight: "100vh",
      }}
    >
      <section>
        <Header />
      </section>
      <hr />
      <Categories />
      <hr />
      <Cart />
    </div>
  );
}

export default App;
