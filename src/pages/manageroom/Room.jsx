import React from "react";
import { useNavigate } from "react-router-dom";
import NotImage from "../../assets/images/notImage.png";
import Profile from "../../assets/images/user.webp";
function Room({ info, deleteRoom, watt }) {
  const nav = useNavigate();
  return (
    <div class="col container-room">
      <div class="card">
        <div className="card-wattage"> {watt ? watt + " W" : "Loading..."}</div>
        <img
          class="card-img"
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

        <div class="card-footer pt-0 border-top-0 bg-transparent">
          <div class="text-center d-flex justify-content-between">
            <a
              class="btn btn-outline-dark mt-auto"
              onClick={() => nav(`/room/${info.roomId}`)}
            >
              Vào phòng
            </a>
            <a class="btn btn-outline-dark mt-auto">Thay đổi</a>
            <a
              class="btn btn-outline-dark mt-auto"
              onClick={() => deleteRoom(info.roomId)}
            >
              Xóa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
