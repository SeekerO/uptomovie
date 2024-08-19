import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/subpath">
    <App />
    {/* </React.StrictMode>  <React.StrictMode> */}
  </BrowserRouter>
);
