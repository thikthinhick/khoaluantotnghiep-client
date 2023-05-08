import React, { useEffect, useState } from "react";
import { Calendar2, Table, ArrowLeft } from "react-bootstrap-icons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ToggleSwitch } from "../../components/button/Button";
import { httpClient } from "../../utils/httpClient";
import Pagination from "../../components/pagination/Pagination";
import Status from "../../components/status/Status";
import Popup from "../../components/popup/Popup";
import { URL } from "../../contants/Contants";
import { useStore } from "../../store/AppProvider";
import "./ApplianceDetail.css";
import CreateSchedule from "./CreateSchedule";
import EditSchedule from "./EditSchedule";
const URL_WEB_SOCKET = "ws://localhost:8081/websocket";
function ApplianceDetail() {
  const { applianceId } = useParams();
  const location = useLocation();
  const [showCreateAppliance, setShowCreateAppliance] = useState(false);
  const [state, setState] = useState({ dbSchedules: [] });
  const [page, setPage] = useState(0);
  const [watt, setWatt] = useState();
  const [ws, setWs] = useState(null);
  const nav = useNavigate();
  const { setLoading } = useStore();
  const request = {
    typeMessage: "SUBSCRIBE_APPLIANCE",
    applianceId: applianceId,
  };
  const { user } = useStore();
  useEffect(() => {
    setLoading(true);
    httpClient()
      .get(`/api/appliance?id=${applianceId}`)
      .then((res) => {
        let data = res.data;
        data = {
          ...data.appliance,
          consumptionCurrentMonth: data.consumptionCurrentMonth,
          consumptionTotal: data.consumptionTotal,
          costCurrentMonth: data.costCurrentMonth,
          costTotal: data.costTotal,
          dbSchedules: data.appliance.dbSchedules.map((element) => {
            element.showEditSchedule = false;
            return element;
          }),
        };
        setState(data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "ERR_NETWORK") nav("/error-server");
        else if (err.response?.data.responseCode === -1) nav("/profile");
      });
  }, [location.pathname]);
  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(request));
      console.log("connected to server!");
    };
    wsClient.onmessage = (response) => {
      let message = JSON.parse(response.data);
      if (message.typeMessage === "SPEED_METER") {
        setWatt(message.data);
      }
    };
    wsClient.onclose = () => console.log("closed!");
    return () => {
      wsClient.close();
    };
  }, []);
  const deleteSchedule = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch trình không?")) {
      httpClient()
        .delete(`/api/schedule`, {
          data: { userId: user.value.userId, scheduleId: id },
        })
        .then((res) => {
          setState({
            ...state,
            dbSchedules: state.dbSchedules.filter(
              (element) => element.id !== id
            ),
          });
          alert("Xóa lịch trình thành công");
        })
        .catch((err) => {
          alert("Xóa lịch trình thất bại");
        });
    }
  };
  const updateSchedule = (schedule) => {
    let dbSchedules = state.dbSchedules.map((element) => {
      if (element.id === schedule.id)
        return { ...element, ...schedule, showEditSchedule: false };
      return element;
    });
    setState({
      ...state,
      dbSchedules: dbSchedules,
    });
  };
  const addSchedule = (schedule) => {
    setState({ ...state, dbSchedules: [...state.dbSchedules, schedule] });
  };
  const changeShowEditSchedule = (scheduleId) => {
    const schedules = state.dbSchedules.map((element) => {
      if (element.id === scheduleId)
        return { ...element, showEditSchedule: !element.showEditAppliance };
      return element;
    });
    setState({ ...state, dbSchedules: schedules });
  };
  const closeShowEditSchedule = () => {
    const schedules = state.dbSchedules.map((element) => {
      return { ...element, showEditSchedule: false };
    });
    setState({ ...state, dbSchedules: schedules });
  };
  const changeAutoOff = () => {
    const message = state.autoOff ? "'tắt'" : "'bật'";
    if (
      window.confirm(
        `Bạn có muốn ${message} chế độ tự động tắt thiết bị khi ở chế độ chờ không?`
      )
    ) {
      httpClient()
        .put(`/api/appliance/change_auto_off`, {
          autoOff: !state.autoOff,
          applianceId: applianceId,
        })
        .then((res) => {
          setState({ ...state, autoOff: !state.autoOff });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const changeScheduleStatus = (scheduleId, scheduleStatus) => {
    const message = scheduleStatus ? "bật" : "tắt";
    if (window.confirm(`Bạn có muốn ${message} lịch trình không?`)) {
      httpClient()
        .put(`${URL}api/schedule/change_status`, {
          scheduleId: scheduleId,
          scheduleStatus: scheduleStatus,
        })
        .then((res) => {
          const schedules = state.dbSchedules.map((element) =>
            element.id === scheduleId
              ? { ...element, status: !element.status }
              : element
          );
          setState({ ...state, dbSchedules: schedules });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const updateStatusAppliance = () => {
    const message = state.status ? "tắt" : "bật";
    if (window.confirm(`Bạn có muốn ${message} thiết bị không?`) === true) {
      httpClient()
        .put(`${URL}api/appliance/change_status`, {
          status: !state.status,
          applianceId: applianceId,
          userId: user.value.userId,
        })
        .then((res) => {
          setState({ ...state, status: !state.status });
        })
        .catch((err) => {
          // alert(`Không thể ${message} thiết bị! hãy kiểm tra lại`);
        });
    }
  };
  return (
    <main>
      <div className="container-fluid px-4 container__appliance-detail">
        <button className="px-2 bg-transparent mb-2" onClick={() => nav(-1)}>
          <ArrowLeft size={16} />
          {"  "}
          <span style={{ textDecoration: "underline" }}>Trở về phòng</span>
        </button>
        <div className="row header">
          <div className="col-xl-8 d-flex">
            <div className="col-xl-6">
              <img
                src={state.thumbnail}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-xl-6 description px-4">
              <h2>{state.name}</h2>
              <ul>
                <li className="description-appliance">
                  <b style={{ color: "black" }}>Mô tả: </b>
                  {state.description}
                </li>
                <li>
                  <b>Công suất hiện tại: </b>
                  <h2 style={{ color: "var(--primary-color)" }}>
                    {watt ? watt.value : "0"} W
                  </h2>
                </li>

                <li className="d-flex align-items-center">
                  <b>Trạng thái :</b>&ensp;
                  {watt ? (
                    watt.standBy ? (
                      <Status index={3} />
                    ) : (
                      <Status index={1} />
                    )
                  ) : (
                    <Status index={2} />
                  )}
                </li>
                <li className="mt-2 d-flex align-items-center">
                  <b>Tắt thiết bị tự động:</b>
                  <div className="mx-2">
                    <ToggleSwitch value={state.autoOff} click={changeAutoOff} />
                  </div>
                </li>
                <li className="mt-2">
                  <a
                    className="btn btn-outline-dark mt-auto"
                    onClick={updateStatusAppliance}
                  >
                    {watt ? "Tắt thiết bị" : "Bật thiết bị"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <Table />
                &nbsp; Các chỉ số liên quan
              </div>
              <div className="card-body">
                <table className="table table-consumption">
                  <tbody>
                    <tr>
                      <td>Tiêu thụ tháng này:</td>
                      <td>
                        <b>{state.consumptionCurrentMonth} kWh</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Chi phí tháng này:</td>
                      <td>
                        <b>{state.costCurrentMonth}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Tổng tiêu thụ:</td>
                      <td>
                        <b>{state.consumptionTotal} kWh</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Tổng chi phí:</td>
                      <td>
                        <b>{state.costTotal}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header align-items-center d-flex">
            <Calendar2 />
            &nbsp; Danh sách lịch trình
          </div>
          <div className="card-body">
            <div className="row px-3 container-manager-room">
              {state.dbSchedules.length === 0 ? (
                <h2 className="text-aligns-center p-4 text-center">
                  Danh sách trống
                </h2>
              ) : (
                <table className="table border">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Tên lịch trình</th>
                      <th scope="col">Lặp lại</th>
                      <th scope="col">Bắt đầu</th>
                      <th scope="col">Kết thúc</th>
                      <th scope="col">Tùy chọn</th>
                      <th scope="col">Bật / tắt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.dbSchedules
                      .slice(page * 4, (page + 1) * 4)
                      .map((element, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{element.name}</td>
                          <td>
                            {element.repeatDay ? element.repeatDay : "Không"}
                          </td>
                          <td>{element.startDate}</td>
                          <td>{element.endDate}</td>
                          <td>
                            <div className="d-flex">
                              <Popup
                                title={"Chỉnh sửa lịch trình"}
                                show={element.showEditSchedule}
                                close={closeShowEditSchedule}
                                trigger={
                                  <a
                                    className="btn btn-outline-dark mt-auto"
                                    onClick={() =>
                                      changeShowEditSchedule(element.id)
                                    }
                                  >
                                    Chỉnh sửa lịch trình
                                  </a>
                                }
                              >
                                <EditSchedule
                                  info={element}
                                  close={closeShowEditSchedule}
                                  updateSchedule={updateSchedule}
                                />
                              </Popup>
                              <a
                                className="btn btn-outline-dark mt-auto mx-2"
                                onClick={() => deleteSchedule(element.id)}
                              >
                                Xóa
                              </a>
                            </div>
                          </td>
                          <td>
                            <div
                              style={{
                                width: "fit-content",
                              }}
                              onClick={() =>
                                changeScheduleStatus(
                                  element.id,
                                  !element.status
                                )
                              }
                            >
                              <ToggleSwitch value={element.status} />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}

              <div className="p-0 d-flex justify-content-between">
                <Popup
                  title={"Tạo lịch trình mới"}
                  show={showCreateAppliance}
                  close={setShowCreateAppliance}
                  trigger={
                    <a
                      className="btn btn-outline-dark mt-auto"
                      onClick={() => setShowCreateAppliance(true)}
                    >
                      Tạo lịch trình mới
                    </a>
                  }
                >
                  <CreateSchedule
                    close={setShowCreateAppliance}
                    applianceId={applianceId}
                    addSchedule={addSchedule}
                  />
                </Popup>
                {state.dbSchedules.length === 0 ? (
                  <></>
                ) : (
                  <Pagination
                    total={state.dbSchedules.length}
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

export default ApplianceDetail;
