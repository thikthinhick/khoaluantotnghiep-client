import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronCompactRight, Table } from "react-bootstrap-icons";
import { useParams, Link } from "react-router-dom";
import LoadingIcon from "../../components/loading/LoadingIcon";
import MultipleOption from "../../components/multipleOption/MultipleOption";
import Pagination from "../../components/pagination/Pagination";
import Popup from "../../components/popup/Popup";
import { URL as url } from "../../contants/Contants";
import { useStore } from "../../store/AppProvider";
import EditAppliance from "./EditAppliance";
import "./ManageAppliance.css";
import Status from "../../components/status/Status";
const URL_WEB_SOCKET = "ws://localhost:8081/websocket";

function ManageAppliance() {
  let { id } = useParams();
  const request = {
    typeMessage: "SUBSCRIBE_ROOM",
    roomId: id,
  };
  const [watts, setWatts] = useState({});
  const { user } = useStore();
  const { setLoading } = useStore();
  const [ws, setWs] = useState(null);
  const [visiableUser, setVisiableUser] = useState(false);
  const [visiableAppliance, setVisiableAppliance] = useState(false);
  const [state, setState] = useState({ appliances: [], users: [] });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}api/room?id=${id}`)
      .then((res) => {
        setState(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(request));
      console.log("connected to server!");
    };
    wsClient.onmessage = (response) => {
      let message = JSON.parse(response.data);
      if (message.typeMessage === "SPEED_METTER_ROOM") {
        setWatts(message.data);
      }
    };
    wsClient.onclose = () => console.log("closed!");
    return () => {
      wsClient.close();
    };
  }, []);
  const updateUser = (users) => {
    setState({ ...state, users: users });
  };
  const updateAppliance = (appliance) => {
    setState({ ...state, appliances: [...state.appliances, appliance] });
  };
  const deleteAppliance = async (appliaceId) => {
    if (window.confirm("bạn có chắc chắn muốn xóa không?") === true) {
      axios
        .delete(`${url}api/appliance`, {
          data: {
            userId: user.value.userId,
            applianceId: appliaceId,
          },
        })
        .then(() => {
          alert("Xóa thành công!");
          const appliances = state.appliances.filter((element) => {
            return element.id !== appliaceId;
          });
          setState({
            ...state,
            appliances: appliances,
          });
        })
        .catch((err) => {
          alert("Xóa không thành công!");
        });
    }
  };
  const updateStatusAppliance = (applianceId, status) => {
    const message = status ? "tắt" : "bật";
    if (window.confirm(`Bạn có muốn ${message} thiết bị không?`) === true) {
      axios
        .put(`${url}api/appliance/change_status`, {
          status: !status,
          applianceId: applianceId,
          userId: user.value.userId,
        })
        .then((res) => {
          console.log(res.data);
          let listAppliances = state.appliances.map((element) => {
            if (element.id === applianceId) element.status = !status;
            return element;
          });
          setState({ ...state, appliances: listAppliances });
        })
        .catch((err) => {
          alert(`Không thể ${message} thiết bị! hãy kiểm tra lại`);
        });
    }
  };
  const updateStatusAllAppliance = () => {
    if (
      window.confirm(
        `Bạn có muốn tắt tất cả các thiết bị trong phòng không?`
      ) === true
    ) {
      axios
        .put(`${url}api/appliance/change_status_all`, {
          roomId: id,
          userId: user.value.userId,
        })
        .then((res) => {
          let appliances = state.appliances.map((element) => {
            element.status = false;
            return element;
          });
          console.log(appliances);
          setState({ ...state, appliances: appliances });
          alert("Tắt thành công!");
        })
        .catch((err) => {
          console.log(err);
          alert(`Không thế tắt tất cả các thiết bị hãy kiểm tra lại`);
        });
    }
  };
  const totalWatt = () => {
    let sum = 0;
    for (let key in watts) {
      sum += watts[key].value;
    }
    return sum;
  };
  return (
    <main>
      <div className="container-fluid px-4 containerManageAppliance">
        <div className="containerManageAppliance__header">
          <div className="d-flex" style={{ height: "100%" }}>
            <div
              className="col-6 background-image"
              style={{ backgroundImage: `url(${state.thumbnail})` }}
            ></div>
            <div className="col-6" style={{ height: "100%" }}>
              <h2>{state.roomName}</h2>
              <p style={{ color: "gray", height: "40px" }}>
                {state.descriptionRoom}
              </p>
              <a
                className="btn btn-outline-dark mt-2"
                onClick={updateStatusAllAppliance}
              >
                Tắt tất cả
              </a>{" "}
              <div className="d-flex mt-3">
                <div className="item col-4">
                  <div className="content">
                    <span>Công suất hiện tại</span>
                    {watts ? (
                      <h2>
                        {totalWatt()} <span>w</span>
                      </h2>
                    ) : (
                      <LoadingIcon />
                    )}
                  </div>
                </div>
                <div className="item col-4">
                  <div className="content">
                    <span>Tiêu thụ trong tháng</span>
                    <h2>
                      {state.totalConsumptionMonth} <span>Số điện</span>
                    </h2>
                  </div>
                </div>
                <div className="item col-4">
                  <div className="content">
                    <span>Người điều khiển</span>
                    <div className="d-flex justify-content-between align-items-center">
                      <ul className="d-flex users">
                        {state.users.map((element, index) => (
                          <li key={element.id}>
                            <img src={element.thumbnail} />
                          </li>
                        ))}
                      </ul>
                      <Popup
                        title={"Chọn người điều khiển"}
                        close={setVisiableUser}
                        show={visiableUser}
                        trigger={
                          <div disabled={user.value.roles[0] !== "ADMIN"}>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => setVisiableUser(true)}
                            >
                              <ChevronCompactRight size={20} />
                            </a>
                          </div>
                        }
                      >
                        <MultipleOption
                          roomId={state.roomId}
                          close={setVisiableUser}
                          updateUser={updateUser}
                        />
                      </Popup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4 my-4">
          <div className="card-header align-items-center d-flex">
            <Table />
            &nbsp; Danh sách thiết bị
          </div>
          <div className="card-body">
            <div className="row px-3 container-manager-room">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên thiết bị</th>
                    <th scope="col">Tình trạng thiết bị</th>
                    <th scope="col">Tiêu thụ hiện tại</th>
                    <th scope="col">Tùy chọn</th>
                    <th scope="col">Bật / tắt</th>
                  </tr>
                </thead>
                <tbody>
                  {state.appliances.map((element, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.name}</td>
                      <td>
                        {watts[element.id] ? (
                          watts[element.id].standBy ? (
                            <Status index={3} />
                          ) : (
                            <Status index={1} />
                          )
                        ) : (
                          <Status index={2} />
                        )}
                      </td>
                      <td>
                        {watts[element.id] ? watts[element.id].value : "0"} W
                      </td>

                      <td>
                        <div className="d-flex">
                          <Link
                            className="btn btn-outline-dark mt-auto"
                            to={`appliance/${element.id}`}
                          >
                            Chi tiết
                          </Link>
                          <div disabled={user.value.roles[0] !== "ADMIN"}>
                            <a className="btn btn-outline-dark mt-auto mx-2">
                              Chỉnh sửa thiết bị
                            </a>
                          </div>

                          <div disabled={user.value.roles[0] !== "ADMIN"}>
                            <a
                              className="btn btn-outline-dark mt-auto mx-2"
                              onClick={() => deleteAppliance(element.id)}
                            >
                              Xóa thiết bị
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          className="btn btn-outline-dark mt-auto"
                          onClick={() =>
                            updateStatusAppliance(element.id, element.status)
                          }
                        >
                          {element.status ? "Tắt thiết bị" : "Bật thiết bị"}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-0 d-flex justify-content-between">
                <Popup
                  title={"Tạo thiết bị mới"}
                  show={visiableAppliance}
                  trigger={
                    <div disabled={user.value.roles[0] !== "ADMIN"}>
                      <a
                        className="btn btn-outline-dark mt-auto"
                        onClick={() => setVisiableAppliance(true)}
                      >
                        Thêm thiết bị
                      </a>
                    </div>
                  }
                >
                  <EditAppliance
                    close={setVisiableAppliance}
                    roomId={state.roomId}
                    updateAppliance={updateAppliance}
                  />
                </Popup>
                {/* <Pagination  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManageAppliance;
