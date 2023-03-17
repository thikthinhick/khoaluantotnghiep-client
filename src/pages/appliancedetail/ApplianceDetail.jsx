import axios from "axios";
import React, { useEffect, useState } from "react";
import { Calendar2, Table } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import { ToggleSwitch } from "../../components/button/Button";
import LoadingIcon from "../../components/loading/LoadingIcon";
import Pagination from "../../components/pagination/Pagination";
import Popup from "../../components/popup/Popup";
import { URL } from "../../contants/Contants";
import { useStore } from "../../store/AppProvider";
import "./ApplianceDetail.css";
import CreateSchedule from "./CreateSchedule";
import EditSchedule from "./EditSchedule";
function ApplianceDetail() {
  const { applianceId } = useParams();
  const [showCreateAppliance, setShowCreateAppliance] = useState(false);
  const [state, setState] = useState({ dbSchedules: [] });
  const { user } = useStore();
  useEffect(() => {
    axios
      .get(`${URL}api/appliance?id=${applianceId}`)
      .then((res) => {
        let data = res.data;
        data = {
          ...data,

          dbSchedules: data.dbSchedules.map((element) => {
            element.showEditSchedule = false;
            return element;
          }),
        };
        setState(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteSchedule = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch trình không?")) {
      axios
        .delete(`${URL}api/schedule`, {
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
  return (
    <main>
      <div className="container-fluid px-4 pt-4 container__appliance-detail">
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
                <li className="description-appliance">{state.description}</li>
                <li>
                  <b>Công suất hiện tại: </b>
                  <h2 style={{ color: "var(--primary-color)" }}>
                    <LoadingIcon />
                  </h2>
                </li>
                <li>
                  <b>Tổng năng lượng đã tiêu thụ: </b>400 kWh
                </li>
                <li className="d-flex align-items-center">
                  <b>Trạng thái :</b>&ensp;
                  {/* <Status index={1} /> */}
                  <LoadingIcon />
                </li>
                <li className="mt-2">
                  <a className="btn btn-outline-dark mt-auto" href="#">
                    Tắt thiết bị
                  </a>
                  <a className="btn btn-outline-dark mx-2" href="#">
                    Theo dõi
                  </a>

                  <a className="btn btn-outline-dark mt-auto" href="#">
                    Xóa Thiết bị
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
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Loại thiết bị:</td>
                      <td>Loại 1</td>
                    </tr>
                    <tr>
                      <td>Tổng tiêu thụ tháng này</td>
                      <td>50 kWh</td>
                    </tr>
                    <tr>
                      <td>Tổng tiêu thụ tháng trước</td>
                      <td>50 kWh</td>
                    </tr>
                    <tr>
                      <td>Chi phí hiện phải trả:</td>
                      <td>40.000 VNĐ</td>
                    </tr>
                    <tr>
                      <td>Chi phí tháng trước:</td>
                      <td>80.000 VNĐ</td>
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
                      <th scope="col">Số thứ tự</th>
                      <th scope="col">Tên lịch trình</th>
                      <th scope="col">Lặp lại</th>
                      <th scope="col">Bắt đầu</th>
                      <th scope="col">Kết thúc</th>
                      <th scope="col">Tùy chọn</th>
                      <th scope="col">Bật / tắt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.dbSchedules.map((element, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{element.name}</td>
                        <td>
                          {element.repeatDay ? element.repeatDay : "1 lần"}
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
                          <ToggleSwitch value={element.status} />
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
                {state.dbSchedules.length === 0 ? <></> : <Pagination />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ApplianceDetail;
