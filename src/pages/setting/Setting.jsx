import React, { useState, useEffect } from "react";
import { Table, ListUl } from "react-bootstrap-icons";
import { XCircleFill } from "react-bootstrap-icons";
import Status from "../../components/status/Status";
import Popup from "../../components/popup/Popup";
import TariffDetail from "./TariffDetail";
import { httpClient } from "../../utils/httpClient";
import Pagination from "../../components/pagination/Pagination";
import EditUser from "./EditUser";
import { useStore } from "../../store/AppProvider";
import { useNavigate } from "react-router-dom";
const data = [
  {
    key: "1",
    name: "Biểu giá điện đơn",
  },
  {
    key: "2",
    name: "Biểu giá điện theo thời điểm",
  },
  {
    key: "3",
    name: "biểu giá điện theo số lượng điện",
  },
];
export default function Setting() {
  const { setLoading } = useStore();
  const nav = useNavigate();
  const [page, setPage] = useState(0);
  const [visiabled, setVisiabled] = useState(false);
  const [state, setState] = useState({ users: [] });
  useEffect(() => {
    setLoading(true);
    httpClient()
      .get(`/api/setting`)
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
  }, []);
  const handleChangeField = (e) => {
    const { value } = e.target;
    if (
      window.confirm(
        "Biểu giá sẽ áp dụng vào tháng sau, bạn có chắc chắn muốn đặt lịch thay đổi biểu giá điện không?"
      )
    ) {
      httpClient()
        .put(`/api/bill/${value}`)
        .then((res) => {
          alert("Cập nhật thành công!");
          setState({ ...state, staffTypeChange: value });
        })
        .catch((err) => {
          alert("Cập nhật không thành công!");
        });
    }
  };
  const removeScheduleBill = () => {
    if (
      window.confirm(
        "Bạn có muốn xóa lịch cập nhật biểu giá điện vào tháng sau không?"
      )
    ) {
      httpClient()
        .delete(`/api/bill`)
        .then((res) => {
          alert("Xóa thành công!");
          setState({ ...state, staffTypeChange: null });
        })
        .catch((err) => {
          alert("Xóa không thành công");
        });
    }
  };
  const updateUsers = (data) => {
    console.log(data);
    console.log(state.users);
    const newUsers = state.users.map((element) =>
      element.id === data.id ? { ...element, ...data } : element
    );

    setState({ ...state, users: newUsers });
  };
  return (
    <main>
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-xl-4 col-md-6">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div>
                  <Table />
                  &nbsp; Chọn biểu giá điện
                </div>
                <div>
                  <Popup
                    title={"Chỉnh sửa biểu giá điện"}
                    trigger={
                      <div>
                        <button
                          style={{ padding: "0px 8px", borderRadius: "3px" }}
                          onClick={() => setVisiabled(true)}
                        >
                          <ListUl size={18} color={"black"} /> Chỉnh sửa
                        </button>
                      </div>
                    }
                    close={() => setVisiabled(false)}
                    show={visiabled}
                  >
                    <TariffDetail close={setVisiabled} />
                  </Popup>
                </div>
              </div>
              <div className="card-body">
                {data.map((element) => (
                  <div class="form-check" key={element.key}>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="staffType"
                      value={element.key}
                      onChange={handleChangeField}
                      checked={state.staffType === element.key}
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      {element.name}
                    </label>
                    {state.staffTypeChange === element.key ? (
                      <span className="staff-schedule">
                        Đã đặt lịch <span className="background-white"></span>
                        <button onClick={removeScheduleBill}>
                          <XCircleFill style={{ color: "var(--red-color)" }} />
                        </button>
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header">
            <Table />
            &nbsp; Quản lý người dùng
          </div>
          <div className="card-body">
            <table id="customers">
              <tr>
                <th>STT</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Danh sách phòng quản lý</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
              {state.users.map((element, index) => {
                element.index = index + 1;
                return (
                  <RowUser
                    key={index}
                    info={element}
                    updateState={updateUsers}
                  />
                );
              })}
            </table>

            <div className="mt-3" style={{ float: "right" }}>
              {state.users.length === 0 ? (
                <></>
              ) : (
                <Pagination
                  total={state.users.length}
                  page={page}
                  changePage={setPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
const RowUser = ({ info, updateState }) => {
  const [visiabled, setVisiabled] = useState(false);
  return (
    <tr>
      <td>{info.index}</td>
      <td>
        <img
          src={info.thumbnail}
          style={{
            height: "26px",
            width: "26px",
            borderRadius: "13px",
            marginRight: "5px",
          }}
        />
        {info.username}
      </td>
      <td>{info.email}</td>
      <td>
        {info.listRoomNames.length !== 0
          ? info.listRoomNames.toString()
          : "Chưa có phòng nào !"}
      </td>
      <td>{info.active ? <Status index={5} /> : <Status index={6} />}</td>
      <td>
        <Popup
          title={"Quản lí người dùng"}
          trigger={
            <a
              className="btn btn-outline-dark mt-auto"
              onClick={() => setVisiabled(true)}
            >
              Chỉnh sửa
            </a>
          }
          close={() => setVisiabled(false)}
          show={visiabled}
        >
          <EditUser
            updateState={updateState}
            userId={info.id}
            close={() => setVisiabled(false)}
          />
        </Popup>
      </td>
    </tr>
  );
};
