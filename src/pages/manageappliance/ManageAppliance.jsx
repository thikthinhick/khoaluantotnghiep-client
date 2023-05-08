import React, { useEffect, useState } from "react";
import { ChevronCompactRight, Table, ArrowLeft } from "react-bootstrap-icons";
import { useParams, Link, useNavigate } from "react-router-dom";
import LoadingIcon from "../../components/loading/LoadingIcon";
import MultipleOption from "../../components/multipleOption/MultipleOption";
import { httpClient } from "../../utils/httpClient";
import Popup from "../../components/popup/Popup";
import { useStore } from "../../store/AppProvider";
import EditAppliance from "./EditAppliance";
import Pagination from "../../components/pagination/Pagination";
import "./ManageAppliance.css";
import Status from "../../components/status/Status";
import CreateAppliance from "./CreateAppliance";
const URL_WEB_SOCKET = "ws://localhost:8081/websocket";

function ManageAppliance() {
  let { id } = useParams();
  const request = {
    typeMessage: "SUBSCRIBE_ROOM",
    roomId: id,
  };
  const nav = useNavigate();
  const [watts, setWatts] = useState({});
  const { user } = useStore();
  const [page, setPage] = useState(0);
  const { setLoading } = useStore();
  const [ws, setWs] = useState(null);
  const [visiableUser, setVisiableUser] = useState(false);
  const [visiableAppliance, setVisiableAppliance] = useState(false);
  const [state, setState] = useState({ appliances: [], users: [] });
  useEffect(() => {
    setLoading(true);
    httpClient()
      .get(`/api/room?id=${id}`)
      .then((res) => {
        setState(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "ERR_NETWORK") nav("/error-server");
        else if (err.response?.data.responseCode === -1) nav("/profile");
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
  const updateStateAppliance = (applianceId, applianceName) => {
    console.log(applianceId + " " + applianceName);
    const newAppliance = state.appliances.map((element) =>
      element.id === applianceId ? { ...element, name: applianceName } : element
    );
    setState({ ...state, appliances: newAppliance });
  };
  const deleteAppliance = async (appliaceId) => {
    if (window.confirm("bạn có chắc chắn muốn xóa không?") === true) {
      httpClient()
        .delete(`/api/appliance`, {
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
      httpClient()
        .put(`/api/appliance/change_status`, {
          status: !status,
          applianceId: applianceId,
          userId: user.value.userId,
        })
        .then((res) => {
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
      httpClient()
        .put(`/api/appliance/change_status_all`, {
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
          // alert(`Không thế tắt tất cả các thiết bị hãy kiểm tra lại`);
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
              {state.appliances.length === 0 ? (
                <h2 className="text-aligns-center p-4 text-center">
                  Danh sách trống
                </h2>
              ) : (
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
                      <RowAppliance
                        info={element}
                        key={index}
                        index={index + 1}
                        watts={watts}
                        deleteAppliance={deleteAppliance}
                        updateStatusAppliance={updateStatusAppliance}
                        updateAppliance={updateStateAppliance}
                      />
                    ))}
                  </tbody>
                </table>
              )}
              <div className="p-0 d-flex justify-content-between">
                <Popup
                  title={"Tạo thiết bị mới"}
                  show={visiableAppliance}
                  close={() => setVisiableAppliance(false)}
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
                  <CreateAppliance
                    close={setVisiableAppliance}
                    roomId={state.roomId}
                    updateAppliance={updateAppliance}
                  />
                </Popup>
                {state.appliances.length === 0 ? (
                  <></>
                ) : (
                  <Pagination
                    total={state.appliances.length}
                    page={page}
                    changePage={setPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
const RowAppliance = ({
  info,
  watts,
  deleteAppliance,
  updateStatusAppliance,
  index,
  updateAppliance,
}) => {
  const { user } = useStore();
  const [visiabled, setVisiabled] = useState(false);
  const getDataParent = () => {
    const { id, description, name, thumbnail } = info;
    return {
      applianceId: id,
      applianceDescription: description,
      applianceName: name,
      thumbnail,
    };
  };
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{info.name}</td>
      <td>
        {watts[info.id] ? (
          watts[info.id].standBy ? (
            <Status index={3} />
          ) : (
            <Status index={1} />
          )
        ) : (
          <Status index={2} />
        )}
      </td>
      <td>{watts[info.id] ? watts[info.id].value : "0"} W</td>
      <td>
        <div className="d-flex">
          <Link
            className="btn btn-outline-dark mt-auto"
            to={`appliance/${info.id}`}
          >
            Chi tiết
          </Link>
          <Popup
            title={"Chỉnh sửa thiết bị"}
            show={visiabled}
            close={() => setVisiabled(false)}
            trigger={
              <div disabled={user.value.roles[0] !== "ADMIN"}>
                <a
                  className="btn btn-outline-dark mt-auto mx-2"
                  onClick={() => setVisiabled(true)}
                >
                  Chỉnh sửa thiết bị
                </a>
              </div>
            }
          >
            <EditAppliance
              getDataParent={getDataParent}
              updateAppliance={updateAppliance}
              close={() => setVisiabled(false)}
            />
          </Popup>
          <div disabled={user.value.roles[0] !== "ADMIN"}>
            <a
              className="btn btn-outline-dark mt-auto mx-2"
              onClick={() => deleteAppliance(info.id)}
            >
              Xóa thiết bị
            </a>
          </div>
        </div>
      </td>
      <td>
        <a
          className="btn btn-outline-dark mt-auto"
          onClick={() => updateStatusAppliance(info.id, info.status)}
        >
          {watts[info.id] ? "Tắt thiết bị" : "Bật thiết bị"}
        </a>
      </td>
    </tr>
  );
};
export default ManageAppliance;
