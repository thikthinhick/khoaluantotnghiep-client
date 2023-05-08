import React, { useState } from "react";
import useComponentVisible from "../useComponentVisiable";
import { Search, ArrowReturnLeft } from "react-bootstrap-icons";
import axios from "axios";
import "./NavbarTop.css";
import { URL } from "../../contants/Contants";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/httpClient";
function Searchbar() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [input, setInput] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const handleChange = (e) => {
    const { value } = e.target;
    if (value !== "") loadData(value);
    setInput(value);
  };
  const loadData = (value) => {
    httpClient()
      .get(`/api/appliance/search?keyword=${value}`)
      .then((res) => {
        setFilterResult(res.data.info);
      })
      .catch((err) => {});
  };
  const nav = useNavigate();
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
          autocomplete="off"
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
              <li
                class="list-group-item d-flex justify-content-between"
                key={index}
                onClick={() => {
                  setIsComponentVisible(false);
                  nav(
                    `room/${element.roomId}/appliance/${element.applianceId}`
                  );
                }}
              >
                <div>
                  <b>{element.applianceName}</b>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    ({element.roomName})
                  </p>
                </div>
                <ArrowReturnLeft size={18} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

export default Searchbar;
