import React from "react";
import { BellFill, ChevronCompactDown } from "react-bootstrap-icons";
import useComponentVisible from "../useComponentVisiable";
import profile from "../../assets/images/user.webp";
import "./NavbarTop.css";
const data = [
  {
    id: 1,
    thumbnail: profile,
    name: "Chương Lê",
    content: "Tắt máy giặt trong nhà tắm",
    time: "3 tiếng trước",
    new: true,
  },
  {
    id: 2,
    thumbnail: profile,
    name: "Chương Lê",
    content: "Tắt máy giặt trong nhà tắm",
    time: "3 tiếng trước",
    new: false,
  },
  {
    id: 3,
    thumbnail: profile,
    name: "Chương Lê",
    content: "Tắt máy giặt trong nhà tắm",
    time: "3 tiếng trước",
    new: false,
  },
];
function Notification() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <div className="notification">
      <BellFill
        color="white"
        size={20}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        style={{ cursor: "pointer" }}
      />
      {isComponentVisible && (
        <div className="notification-content" ref={ref}>
          <div className="border-arrow"></div>
          <div className="notification-content__container">
            <h5
              style={{
                padding: "4px",
                textAlign: "center",
                borderBottom: "1px solid rgba(0,0,0,0.175)",
              }}
            >
              Thông báo
            </h5>
            <ul class="list-group" style={{ borderRadius: "0px" }}>
              {data.map((element, index) => (
                <li class="list-group-item " key={index}>
                  <div className="notifi-item">
                    <div className="notification-content__img">
                      <img src={element.thumbnail} />
                    </div>
                    <div className="notification-content__body">
                      <b>{element.name}</b>
                      <p>{element.content}</p>
                    </div>
                    <div className="notification-content__time">
                      <span>{element.time}</span>
                      {element.new ? <span className="status"></span> : <></>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
