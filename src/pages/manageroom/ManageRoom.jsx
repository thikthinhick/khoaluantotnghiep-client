import React, { useEffect, useRef, useState } from "react";
import { URL } from "../../contants/Contants";
import "./ManageRoom.css";
import Room from "./Room";
import axios from "axios";
import Popup from "../../components/popup/Popup";
import EditRoom from "./EditRoom";
const URL_WEB_SOCKET = "ws://localhost:8081/websocket";
const request = {
  typeMessage: "SUBSCRIBE_ROOMS",
};
function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [watts, setWatts] = useState({});
  const [visible, setVisible] = useState({ createRoom: false });
  const [ws, setWs] = useState(null);
  useEffect(() => {
    axios
      .get(`${URL}api/room`)
      .then((response) => {
        setRooms(response.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(request));
      console.log("connected to server!");
    };
    wsClient.onmessage = (response) => {
      let message = JSON.parse(response.data);
      if (message.typeMessage === "SPEED_METTER_ROOMS") {
        setWatts(message.data);
      }
    };
    wsClient.onclose = () => console.log("closed!");
    return () => {
      wsClient.close();
    };
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
  const closeCreateRoom = () => {
    setVisible({ ...visible, createRoom: false });
  };
  return (
    <main>
      <div className="container-fluid px-4">
        <div class="container">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
            {rooms.map((element) => (
              <Room
                info={element}
                watt={watts[element.roomId]}
                deleteRoom={deleteRoom}
                key={element.roomId}
              />
            ))}
          </div>
          <Popup
            title={"Tạo phòng mới"}
            trigger={
              <a
                class="btn btn-outline-dark mt-auto"
                onClick={() => setVisible({ ...visible, createRoom: true })}
              >
                Tạo phòng mới
              </a>
            }
            close={closeCreateRoom}
            show={visible.createRoom}
          >
            <EditRoom addRoom={addRoom} close={closeCreateRoom} />
          </Popup>
        </div>
      </div>
    </main>
  );
}

export default ManageRoom;
