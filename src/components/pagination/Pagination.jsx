import React from "react";
import "./Pagination.css";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
const ItemPagination = ({ title, style }) => {
  return (
    <div className="item-pagination" style={style}>
      {title}
    </div>
  );
};
function Pagination({ page, total, changePage }) {
  const pages = parseInt((total / 4).toFixed());
  const next = () => {
    changePage(page + 1);
  };
  const prev = () => {
    changePage(page - 1);
  };
  const pick = (id) => {
    changePage(id);
  };
  return (
    <div className="container-pagination">
      <div onClick={prev} disabled={page === 0}>
        <ItemPagination title={<ChevronLeft />} />
      </div>

      {[...Array(pages).keys()].map((element, index) => (
        <div onClick={() => pick(index)}>
          <ItemPagination
            title={index + 1}
            style={
              index == page
                ? {
                    color: "white",
                    background: "var(--primary-color)",
                    border: "none",
                  }
                : {}
            }
          />
        </div>
      ))}

      <div onClick={next} disabled={!(page + 1 < pages)}>
        <ItemPagination title={<ChevronRight />} />
      </div>
    </div>
  );
}

export default Pagination;
