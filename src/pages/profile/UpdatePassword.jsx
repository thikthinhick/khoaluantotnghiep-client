import React, { useState } from "react";
import { URL } from "../../contants/Contants";
import axios from "axios";
import { SortUpAlt } from "react-bootstrap-icons";
function UpdatePassword({ close }) {
  const [form, setForm] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  const submit = () => {
    let check = false;
    if (
      form.password !== "" &&
      form.currentPassword !== "" &&
      form.confirmPassword === form.password &&
      form.password.length >= 8
    )
      check = true;
    if (!check) alert("Các trường nhập vào chưa hợp lệ vui lòng kiểm tra lại!");
    if (
      check &&
      window.confirm("Bạn có chấp nhận đổi mật khẩu hiện tại không?")
    ) {
      axios
        .put(
          `${URL}api/auth/change_password`,
          { currentPassword: form.currentPassword, password: form.password },
          {
            headers: {
              Accept: "application/json",
              Authorization: localStorage.getItem("user")
                ? "Bearer " +
                  JSON.parse(localStorage.getItem("user")).value.token
                : "",
              Profile: true,
            },
          }
        )
        .then((res) => {
          alert("Cập nhật mật khẩu thành công!");
          close();
        })
        .catch((err) => {
          alert("Cập nhật mật khẩu thất bại!");
          close();
        });
    }
  };
  return (
    <>
      <div className="modal-body container__editroom">
        <div className="form-group mb-2">
          <label style={{ float: "left", marginBottom: "4px" }}>
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onUpdateField}
            name="currentPassword"
          />
        </div>
        <div className="form-group mb-2">
          <label style={{ float: "left", marginBottom: "4px" }}>
            Mật khẩu mới
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={onUpdateField}
          />
        </div>
        <div className="form-group mb-2">
          <label style={{ float: "left", marginBottom: "4px" }}>
            Nhập lại mật khẩu mới
          </label>
          <input
            type="password"
            onChange={onUpdateField}
            className="form-control"
            name="confirmPassword"
          />
        </div>
      </div>
      <div className="modal-content__footer">
        <div className="body">
          <input
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
            value="Hủy"
            onClick={() => close()}
          />
          <input
            type="submit"
            className="btn btn-success"
            value="Ghi nhận"
            onClick={submit}
          />
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
