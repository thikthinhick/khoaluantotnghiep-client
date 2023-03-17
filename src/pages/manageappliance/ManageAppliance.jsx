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
        setLoading(false);
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
  const deleteAppliance = async (id) => {
    if (window.confirm("bạn có chắc chắn muốn xóa không?") === true) {
      axios
        .delete(`${url}api/appliance`, {
          data: {
            userId: user.value.userId,
            applianceId: id,
          },
        })
        .then(() => {
          alert("Xóa thành công!");
          const appliances = state.appliances.filter((element) => {
            return element.id !== id;
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
        .put(`${url}api/appliance/change_status?id=${applianceId}`, {
          status: !status,
        })
        .then((res) => {
          let listAppliances = state.appliances.map((element) => {
            if (element.id === applianceId) element.status = res.data.info;
            return element;
          });
          setState({ ...state, appliances: listAppliances });
        })
        .catch((err) => {
          alert(`Không thể ${message} thiết bị! hãy kiểm tra lại`);
        });
    }
  };
  const totalWatt = () => {
    let sum = 0;
    for (let key in watts) {
      sum += watts[key];
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
              <a className="btn btn-outline-dark mt-2">Tắt tất cả</a>{" "}
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
                        show={visiableUser}
                        trigger={
                          <ChevronCompactRight
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => setVisiableUser(true)}
                          />
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
                    <th scope="col">ID</th>
                    <th scope="col">Tên thiết bị</th>
                    <th scope="col">Tình trạng thiết bị</th>
                    <th scope="col">Tiêu thụ hiện tại</th>
                    <th scope="col">Loại thiết bị</th>
                    <th scope="col"></th>
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
                          <Status index={1} />
                        ) : (
                          <Status index={2} />
                        )}
                      </td>
                      <td>{watts[element.id] ? watts[element.id] : 0} W</td>
                      <td>Loại 1</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            className="btn btn-outline-dark mt-auto"
                            to={`appliance/${element.id}`}
                          >
                            Chi tiết
                          </Link>

                          <a className="btn btn-outline-dark mt-auto mx-2">
                            Lập lịch
                          </a>
                          <a
                            className="btn btn-outline-dark mt-auto"
                            onClick={() => deleteAppliance(element.id)}
                          >
                            Xóa thiết bị
                          </a>
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
                    <a
                      className="btn btn-outline-dark mt-auto"
                      onClick={() => setVisiableAppliance(true)}
                    >
                      Thêm thiết bị
                    </a>
                  }
                >
                  <EditAppliance
                    close={setVisiableAppliance}
                    roomId={state.roomId}
                    updateAppliance={updateAppliance}
                  />
                </Popup>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManageAppliance;
