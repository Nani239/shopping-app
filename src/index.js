import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./StoreContext";

import App from "./App"; // Import your main App component

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
