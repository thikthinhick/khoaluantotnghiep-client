import React from "react";
import { Link, Outlet } from "react-router-dom";
import { data } from "../utils/Data";
function Product() {
  return (
    <main>
      <div style={{ display: "flex" }}>
        <nav style={{ padding: "1rem", borderRight: "1px solid" }}>
          {data.map((element, index) => (
            <Link to={element.id.toString()} key={element.id}>
              {element.title}
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    </main>
  );
}

export default Product;
