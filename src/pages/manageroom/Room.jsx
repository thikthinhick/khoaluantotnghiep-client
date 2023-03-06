import React from "react";
import Profile from "../../assets/images/user.webp";
import axios from "axios";
import NotImage from "../../assets/images/notImage.png";
import { URL } from "../../contants/Contants";
import { useNavigate } from "react-router-dom";
function Room({ info, deleteRoom }) {
  const nav = useNavigate();
  return (
    <div class="col container-room">
      <div class="card">
        <img
          class="card-img"
          src={info.thumbnail ? info.thumbnail : NotImage}
          alt="..."
        />
        <div className="container-room__body">
          <div className="top">
            <h5>{info.nameRoom}</h5>
            <p>{info.totalAppliances} thiết bị</p>
          </div>

          <div>
            <b
              style={{
                color: "var(--primary-color)",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {Math.ceil(Math.random() * 5000)} W
            </b>
          </div>

          <ul className="d-flex users">
            {info.listThumbnail.map((element, index) => (
              <li key={index}>
                <img src={element ? element : Profile} />
              </li>
            ))}
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
