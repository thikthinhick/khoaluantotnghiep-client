import React, { useEffect, useRef, useState } from "react";
import { URL } from "../../contants/Contants";
import "./ManageRoom.css";
import Room from "./Room";
import axios from "axios";
import Popup from "../../components/popup/Popup";
import EditRoom from "./EditRoom";
function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}api/room`)
      .then((response) => {
        setRooms(response.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const deleteRoom = (roomId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa!") === true) {
      axios
        .delete(`${URL}api/room/${roomId}`)
        .then((response) => {
          const newRoom = rooms.filter((element) => element.roomId !== roomId);
          setRooms(newRoom);
          alert("Xóa phòng thành công!");
        })
        .catch((err) => {
          alert("Xóa phòng thất bại!");
        });
    }
  };
  const addRoom = (room) => {
    setRooms([...rooms, room]);
  };
  return (
    <main>
      <div className="container-fluid px-4">
        <div class="container">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
            {rooms.map((element) => (
              <Room info={element} deleteRoom={deleteRoom} key={element.id} />
            ))}
          </div>
          <Popup
            title={"Tạo phòng mới"}
            trigger={<a class="btn btn-outline-dark mt-auto">Tạo phòng mới</a>}
          >
            <EditRoom addRoom={addRoom} />
          </Popup>
        </div>
      </div>
    </main>
  );
}

export default ManageRoom;
