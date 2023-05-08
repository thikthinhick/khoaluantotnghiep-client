import React, { useEffect, useState } from "react";
import { Check } from "react-bootstrap-icons";
import { httpClient } from "../../utils/httpClient";
import NotImage from "../../assets/images/notImage.png";
function EditUser({ userId, close, updateState }) {
  const [state, setState] = useState({});
  const changeValue = (id) => {
    const newData = state.rooms.map((element) =>
      element.id === id ? { ...element, checked: !element.checked } : element
    );
    setState({ ...state, rooms: newData });
  };
  useEffect(() => {
    httpClient()
      .get(`/api/setting/edit_user?user_id=${userId}`)
      .then((res) => {
        res.data.active ? (res.data.active = "1") : (res.data.active = "0");
        setState(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const hanleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submit = () => {
    if (window.confirm("Bạn có chắc chắn muốn ghi nhận những thay đổi?")) {
      const body = {
        active: state.active === "1" ? true : false,
        roomIds: state.rooms
          .filter((element) => element.checked === true)
          .map((element) => element.id),
        id: userId,
      };
      httpClient()
        .put(`/api/setting/edit_user`, body)
        .then((res) => {
          alert("Cập nhật thành công!");
          const data = {
            id: userId,
            listRoomNames: state.rooms
              .filter((element) => element.checked === true)
              .map((element) => element.roomName),
            active: state.active === "1" ? true : false,
          };
          updateState(data);
          close();
        })
        .catch((err) => {
          close();
          alert("Cập nhật không thành công!");
        });
    }
  };
  return (
    <div class="container-mutipleOption modal-body" style={{ width: "400px" }}>
      <div className="form-group mb-2">
        <label>Tùy chọn sử dụng hệ thống</label>
        <div className="d-flex justify-content-between">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="active"
              value="1"
              onChange={hanleChange}
              checked={state.active == "1"}
            />
            <span>Cho phép</span>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="active"
              value="0"
              onChange={hanleChange}
              checked={state.active == "0"}
            />
            <span>Không cho phép</span>
          </div>
        </div>
      </div>
      <b>Danh sách phòng quản lý</b>
      <ul style={{ marginTop: "5px" }} class="list-items">
        {state.rooms?.map((element) => (
          <li
            class="item"
            key={element.id}
            onClick={() => changeValue(element.id)}
          >
            <span class="checkbox">
              {element.checked ? <Check className="check-icon" /> : <></>}
            </span>
            <div className="item-info">
              <img
                style={{
                  borderRadius: "2px",
                  width: "45px",
                }}
                src={element.thumbnail ? element.thumbnail : NotImage}
              />
              <span style={{ marginLeft: "10px" }} class="item-text">
                {element.roomName}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="modal-content__footer">
        <div className="body">
          <input
            type="button"
            class="btn btn-default"
            data-dismiss="modal"
            onClick={close}
            value="Hủy"
          />
          <input
            type="submit"
            class="btn btn-success"
            value="Ghi nhận"
            onClick={submit}
          />
        </div>
      </div>
    </div>
  );
}

export default EditUser;
