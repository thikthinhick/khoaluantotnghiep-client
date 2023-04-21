import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import NotImage from "../../assets/images/notImage.png";
import Profile from "../../assets/images/user.webp";
import Popup from "../../components/popup/Popup";
import EditRoom from "./EditRoom";
import { Speedometer2 } from "react-bootstrap-icons";
import { useStore } from "../../store/AppProvider";
function Room({ info, deleteRoom, watt, updateRoom }) {
  const { user } = useStore();
  const [visiable, setVisiable] = useState(false);
  const close = () => {
    setVisiable(false);
  };
  const getDataParent = () => info;
  const nav = useNavigate();
  const joinRoom = () => {
    let x = true;
    if (user.value.roles[0] === "ADMIN") {
      nav(`/room/${info.roomId}`);
      x = false;
    }
    info.users.forEach((element) => {
      if (element.username === user.value.username) {
        nav(`/room/${info.roomId}`);
        x = false;
      }
    });
    if (x) alert("Bạn không được phép vào phòng!");
  };
  return (
    <div className="col container-room">
      <div className="card">
        <div className="card-wattage">
          <Speedometer2 size={18} style={{ marginRight: "5px" }} />{" "}
          {watt ? watt + " W" : "0 W"}
        </div>
        <img
          className="card-img"
          src={info.thumbnail ? info.thumbnail : NotImage}
          alt="..."
        />
        <div className="container-room__body">
          <div className="top">
            <h5>{info.roomName}</h5>
            <p>{info.totalAppliances} thiết bị</p>
          </div>

          <ul className="d-flex users">
            {info.users.length !== 0 ? (
              info.users.map((element, index) => (
                <li key={index}>
                  <img src={element.thumbnail ? element.thumbnail : Profile} />
                </li>
              ))
            ) : (
              <p>Phòng chưa có người nào</p>
            )}
          </ul>
        </div>

        <div className="card-footer pt-0 border-top-0 bg-transparent">
          <div className="d-flex justify-content-between">
            <a className="btn btn-outline-dark mt-auto" onClick={joinRoom}>
              Vào phòng
            </a>

            <Popup
              title={"Chỉnh sửa phòng"}
              trigger={
                <div disabled={user.value.roles[0] !== "ADMIN"}>
                  <a
                    className="btn btn-outline-dark mt-auto"
                    onClick={() => setVisiable(true)}
                  >
                    Chỉnh sửa
                  </a>
                </div>
              }
              show={visiable}
              close={close}
            >
              <EditRoom
                getDataParent={getDataParent}
                updateRoom={updateRoom}
                close={close}
              />
            </Popup>
            <div disabled={user.value.roles[0] !== "ADMIN"}>
              <a
                className="btn btn-outline-dark mt-auto"
                onClick={() => deleteRoom(info.roomId)}
              >
                Xóa phòng
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Room);
