import React from "react";
import "./Pagination.css";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
const ItemPagination = ({ title, style, pick }) => {
  return (
    <div className="item-pagination" style={style} onClick={pick}>
      {title}
    </div>
  );
};
function Pagination({ page, total, changePage }) {
  const pages = parseInt(Math.ceil(total / 4));
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
      <div disabled={page === 0}>
        <ItemPagination title={<ChevronLeft />} pick={prev} />
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

      <div disabled={!(page + 1 < pages)}>
        <ItemPagination title={<ChevronRight />} pick={next} />
      </div>
    </div>
  );
}

export default Pagination;
