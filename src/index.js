import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./test/Home";
import About from "./test/About";
import NotFound from "./test/NotFound";
import Product from "./test/Product";
import Detail from "./test/Detail";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="about" element={<Home />} />
          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<Detail />} />
          </Route>
          <Route path="home" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
