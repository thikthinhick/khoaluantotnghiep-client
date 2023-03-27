import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotImage from "../../assets/images/notImage.png";
import Profile from "../../assets/images/user.webp";
import Popup from "../../components/popup/Popup";
import EditRoom from "./EditRoom";
import { Speedometer2 } from "react-bootstrap-icons";
function Room({ info, deleteRoom, watt, updateRoom }) {
  const [visiable, setVisiable] = useState(false);
  const close = () => {
    setVisiable(false);
  };
  const getDataParent = () => info;
  const nav = useNavigate();
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
            <a
              className="btn btn-outline-dark mt-auto"
              onClick={() => nav(`/room/${info.roomId}`)}
            >
              Vào phòng
            </a>
            <Popup
              title={"Chỉnh sửa phòng"}
              trigger={
                <a
                  className="btn btn-outline-dark mt-auto"
                  onClick={() => setVisiable(true)}
                >
                  Chỉnh sửa
                </a>
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
            <a
              className="btn btn-outline-dark mt-auto"
              onClick={() => deleteRoom(info.roomId)}
            >
              Xóa phòng
            </a>
            {/* <a
              className="btn btn-outline-dark mt-auto"
              onClick={() => deleteRoom(info.roomId)}
            >
              Xóa
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
