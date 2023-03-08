import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronCompactRight, Table } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/loading/LoadingIcon";
import MultipleOption from "../../components/multipleOption/MultipleOption";
import Pagination from "../../components/pagination/Pagination";
import Popup from "../../components/popup/Popup";
import { URL as url } from "../../contants/Contants";
import { useStore } from "../../store/AppProvider";
import EditAppliance from "./EditAppliance";
import "./ManageAppliance.css";
function ManageAppliance() {
  let { id } = useParams();
  const { user } = useStore();
  const { setLoading } = useStore();
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
  return (
    <main>
      l
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
              <a class="btn btn-outline-dark mt-2">Tắt tất cả</a>{" "}
              <div className="d-flex mt-3">
                <div className="item col-4">
                  <div className="content">
                    <span>Công suất hiện tại</span>
                    <h2>
                      <LoadingIcon />
                    </h2>
                  </div>
                </div>
                <div className="item col-4">
                  <div className="content">
                    <span>Tiêu thụ trong tháng</span>
                    <h2>{state.totalConsumption} kWh</h2>
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
              <table class="table">
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
                        {/* <Status index={1} /> */}
                        <LoadingIcon />
                      </td>
                      <td>
                        <LoadingIcon />
                      </td>
                      <td>Loại 1</td>
                      <td>
                        <div className="d-flex">
                          <a class="btn btn-outline-dark mt-auto">Chi tiết</a>
                          <a class="btn btn-outline-dark mt-auto mx-2">
                            Lập lịch
                          </a>
                          <a
                            class="btn btn-outline-dark mt-auto"
                            onClick={() => deleteAppliance(element.id)}
                          >
                            Xóa thiết bị
                          </a>
                        </div>
                      </td>
                      <td>
                        <a class="btn btn-outline-dark mt-auto">Bật thiết bị</a>
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
                      class="btn btn-outline-dark mt-auto"
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
