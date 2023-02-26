import React from "react";
import "./Pagination.css";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
const data = [1, 2];
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
      <ItemPagination title={<ChevronLeft />} />
      {data.map((element) => (
        <ItemPagination
          title={element}
          style={
            active === element
              ? {
                  color: "white",
                  background: "var(--primary-color)",
                  border: "none",
                }
              : {}
          }
        />
      ))}
      <ItemPagination title={<ChevronRight />} />
    </div>
  );
}

export default Pagination;
