import React, { useState } from "react";
import useComponentVisible from "../useComponentVisiable";
import { Search } from "react-bootstrap-icons";
import "./NavbarTop.css";
const data = [
  "Bóng đèn 1",
  "Bóng đèn 2",
  "Bóng đèn 3",
  "Máy giặt",
  "Tủ lạnh",
  "Nồi cơm điện",
  "Lò vi sóng",
];
function Searchbar() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [input, setInput] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const handleChange = (e) => {
    const { value } = e.target;
    setFilterResult(filter_list(value));
    setInput(value);
  };
  const filter_list = (value) => {
    let list = [];
    if (value === "") return list;
    let result = new RegExp(value, "i");

    data.forEach((item) => {
      if (result.test(item)) {
        list.push(item);
      }
    });
    return list;
  };
  return (
    <form
      ref={ref}
      style={{ position: "relative", width: "359px" }}
      className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
    >
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          name="input"
          onChange={handleChange}
          value={input}
          placeholder="Tìm kiếm nhanh thiết bị..."
          onFocus={() => setIsComponentVisible(true)}
        />
        <button
          className="btn"
          style={{ background: "var(--primary-color)" }}
          id="btnNavbarSearch"
          type="button"
        >
          <Search size={20} color={"white"} />
        </button>
      </div>
      <div
        style={{ position: "absolute", width: "100%" }}
        class="list overflow-auto  mt-2 search-bar-result"
      >
        {isComponentVisible && (
          <ul class="list-group">
            {filterResult.map((element, index) => (
              <li class="list-group-item" key={index}>
                {element}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

export default Searchbar;
