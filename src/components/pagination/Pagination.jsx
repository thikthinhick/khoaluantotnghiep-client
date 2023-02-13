import React from "react";
import "./Pagination.css";
const data = ["<", 1, 2, 3, 4, ">"];
const ItemPagination = ({ title, style }) => {
  return (
    <div className="item-pagination" style={style}>
      {title}
    </div>
  );
};
function Pagination() {
  const active = 1;
  return (
    <div className="container-pagination">
      {data.map((element) => (
        <ItemPagination
          title={element}
          style={
            active === element ? { color: "white", background: "#ff4961" } : {}
          }
        />
      ))}
    </div>
  );
}

export default Pagination;
