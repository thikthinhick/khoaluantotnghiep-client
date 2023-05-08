import React from "react";
import { BellFill, SortUpAlt } from "react-bootstrap-icons";
import useComponentVisible from "../useComponentVisiable";
import "./NavbarTop.css";
import { useStore } from "../../store/AppProvider";
import { useEffect, useState, memo } from "react";
import { Datediff } from "../../utils/Data";
import { URL } from "../../contants/Contants";
import { httpClient } from "../../utils/httpClient";
function Notification() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { user } = useStore();
  const [totalNotification, setTotalNotification] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [listening, setListening] = useState(false);
  let eventSource = undefined;
  const getNotification = () => {
    httpClient()
      .get(`/api/notification?user_id=${user.value.userId}`)
      .then((res) => {
        setNotifications(res.data.info);
        setTotalNotification(0);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    httpClient()
      .get(`api/notification/get_total?user_id=${user.value.userId}`)
      .then((res) => {
        setTotalNotification(res.data.info);
      })
      .catch((err) => {});
    if (!listening) {
      eventSource = new EventSource(
        `${URL}api/notification/receive?user_id=${user.value.userId}`
      );
      eventSource.onopen = (event) => {
        console.log("connection opened");
      };
      eventSource.onmessage = (event) => {
        setTotalNotification((prev) => prev + 1);
      };

      eventSource.onerror = (event) => {
        eventSource.close();
      };

      setListening(true);
    }
    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);
  return (
    <div className="notification">
      <div className="notification-icon">
        <BellFill
          color="white"
          size={20}
          onClick={() => {
            getNotification();
            setIsComponentVisible(true);
          }}
          style={{ cursor: "pointer" }}
        />
        {totalNotification > 0 ? (
          totalNotification > 9 ? (
            <span>9+</span>
          ) : (
            <span>{totalNotification}</span>
          )
        ) : (
          <></>
        )}
      </div>

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
              {notifications.map((element, index) => (
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
                      <span>{Datediff(element.time)}</span>
                      {element.new ? <div className="status"></div> : <></>}
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

export default memo(Notification);
