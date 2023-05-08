import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Check, Search } from "react-bootstrap-icons";
import { URL } from "../../contants/Contants";
import "./multipleOption.css";
import { httpClient } from "../../utils/httpClient";
function MultipleOption({ close, roomId, updateUser }) {
  const [input, setInput] = useState("");
  const [state, setState] = useState({ data: [], result: [] });
  const refInput = useRef();
  const changeValue = (id) => {
    const newResult = state.result.map((element) =>
      element.id === id ? { ...element, checked: !element.checked } : element
    );
    const newData = state.data.map((element) =>
      element.id === id ? { ...element, checked: !element.checked } : element
    );
    setState({ data: newData, result: newResult });
  };
  useEffect(() => {
    refInput.current.focus();
    httpClient()
      .get(`/api/auth/get_user?room_id=${roomId}`)
      .then((res) => {
        const response = res.data;
        setState({ result: response, data: response });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChangeInput = (e) => {
    const x = e.target.value.toUpperCase();
    let list = [];
    state.data.forEach((element) => {
      if (element.username.toUpperCase().indexOf(x) > -1) {
        list.push(element);
      }
    });
    setState({ ...state, result: list });
    setInput(e.target.value);
  };
  const submit = () => {
    if (window.confirm("bạn có chắc muốn thay đổi không ?") === true) {
      let users = [];
      state.data.forEach((element) => {
        if (element.checked) {
          users.push(element);
        }
      });
      httpClient()
        .post(`/api/room/${roomId}/add_user_to_room`, {
          userIds: users.map((element) => element.id),
        })
        .then((response) => {
          updateUser(users);
          alert("Cập nhật thành công!");
          close(false);
        })
        .catch((err) => {
          alert("Cập nhật thất bại!");
        });
    }
  };

  return (
    <div class="container-mutipleOption modal-body">
      <div className="search">
        <input
          ref={refInput}
          type="text"
          placeholder="Nhập tên người dùng..."
          className="form-control"
          onChange={onChangeInput}
          value={input}
        />
        <Search className="icons" size={20} />
      </div>

      <ul class="list-items">
        {state.result.map((element) => (
          <li
            class="item"
            key={element.id}
            onClick={() => changeValue(element.id)}
          >
            <span class="checkbox">
              {element.checked ? <Check className="check-icon" /> : <></>}
            </span>
            <div className="item-info">
              <img src={element.thumbnail} />
              <span class="item-text">{element.username}</span>
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
            onClick={() => close(false)}
            value="Hủy"
          />
          <input
            type="submit"
            onClick={submit}
            class="btn btn-success"
            value="Ghi nhận"
          />
        </div>
      </div>
    </div>
  );
}

export default MultipleOption;
