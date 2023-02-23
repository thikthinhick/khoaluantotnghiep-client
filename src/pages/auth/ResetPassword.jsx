import React, { useState } from "react";
import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { URL } from "../../contants/Contants";
import { useStore } from "../../store/AppProvider";
function ResetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({ show: false, token: "" });
  const [form, setForm] = useState({
    password: "",
    confirm_password: "",
    email: "",
  });
  const [notifi, setNotifi] = useState({ success: "", error: "" });
  const [message, setMessage] = useState({
    password: "",
    confirm_password: "",
  });
  const { setLoading } = useStore();
  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URL}api/auth/confirm_reset_password/${params.token}`
        );
        setData({ show: true, token: response.data.info });
      } catch (error) {
        navigate("/errorpage");
      }
      setLoading(false);
    };
    fetchDate();
  }, []);
  const updatePassword = async () => {
    if (form.password.length === 0)
      setMessage({
        password: "Không để trống trường này",
        confirm_password: "",
      });
    else if (form.password.length < 8)
      setMessage({
        password: "Mật khẩu ít nhất phải có 8 kí tự",
        confirm_password: "",
      });
    else if (form.confirm_password !== form.password)
      setMessage({
        password: "",
        confirm_password: "Mật khẩu không trùng khớp",
      });
    else {
      try {
        await axios.put(`${URL}api/auth/reset_password/${data.token}`, {
          password: form.password,
        });
        setNotifi({
          success:
            "Cập nhật mật khẩu thành công, đang chuyển sang trang đăng nhập !",
          error: "",
        });
        return setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setNotifi({
          success: "",
          error: "Cập nhật mật khẩu thất bại, vui lòng cập nhật lại !",
        });
      }
    }
  };
  return true ? (
    <div className="container-login">
      <div class="signup-form">
        <div className="form" style={{ width: "500px" }}>
          <h2>Cập nhật lại mật khẩu</h2>
          <div>
            <p>
              Vui lòng cập nhật lại mật khẩu của bạn, phiên cập nhật có giới hạn
              2 phút!
            </p>
          </div>

          {notifi.error ? (
            <div className="form-group message-error">{notifi.error}</div>
          ) : (
            <></>
          )}
          {notifi.success ? (
            <div className="form-group message-success">{notifi.success}</div>
          ) : (
            <></>
          )}
          <div class="form-group">
            <input
              style={{
                width: "100%",
                padding: "7px",
                marginTop: "3px",
              }}
              type="password"
              class="form-control"
              name="password"
              value={form.username}
              onChange={onUpdateField}
              placeholder="Mật khẩu"
            />
          </div>
          <div className="form-item__error">
            <p>{message.password}</p>
          </div>
          <div class="form-group">
            <input
              style={{
                width: "100%",
                padding: "7px",
                marginTop: "3px",
              }}
              type="password"
              class="form-control"
              name="confirm_password"
              onChange={onUpdateField}
              value={form.confirm_password}
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <div className="form-item__error">
            <p>{message.confirm_password}</p>
          </div>
          <div class="form-group d-flex pt-2">
            <button
              style={{ minWidth: "auto" }}
              class="btn btn-primary btn-lg btn-block"
              onClick={updatePassword}
            >
              CẬP NHẬT
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ResetPassword;
