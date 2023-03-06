import React, { useState } from "react";
import { ChevronDown, Check, CheckSquare } from "react-bootstrap-icons";
import "./multipleOption.css";
import Profile from "../../assets/images/user.webp";
function MultipleOption() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      name: "le van chuong",
      checked: true,
    },
    {
      id: 2,
      name: "le van vu",
      checked: false,
    },
    {
      id: 3,
      name: "le van nam",
      checked: false,
    },
    {
      id: 4,
      name: "le thi van",
      checked: false,
    },
  ]);
  const changeValue = (id) => {
    const newData = data.map((element) =>
      element.id === id ? { ...element, checked: !element.checked } : element
    );
    setData(newData);
  };
  return (
    <div class="container-mutipleOption">
      <div class="select-btn" onClick={() => setShow(!show)}>
        <div>
          <span class="btn-text">Danh sách: </span>
          {data.map((element) =>
            element.checked ? (
              <img
                src={Profile}
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <></>
            )
          )}
        </div>

        <ChevronDown className={show ? "arrow-dwn" : ""} />
      </div>
      {show ? (
        <ul class="list-items">
          {data.map((element) => (
            <li
              class="item"
              key={element.id}
              onClick={() => changeValue(element.id)}
            >
              <span class="checkbox">
                {element.checked ? <Check className="check-icon" /> : <></>}
              </span>
              <div className="item-info">
                <img src={Profile} />
                <span class="item-text">{element.name}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MultipleOption;
