import axios from "axios";
import React, { useState } from "react";
import { SortUpAlt } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useStore } from "../../store/AppProvider";
import "./styles.css";
function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const { login } = useStore();
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwrodError, setPasswordError] = useState(false);
  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  const submitLogin = async () => {
    setUsernameError(false);
    setPasswordError(false);
    setError("");
    if (form.username !== "" && form.password !== "") {
      try {
        await login(form);
      } catch (error) {
        console.log(error);
        if (error.code === "ERR_NETWORK")
          setError("Không thể kết nối với máy chủ");
        else if (error.code === "ERR_BAD_REQUEST")
          setError("Tài khoản hoặc mật khẩu không chính xác");
      }
    }
    if (form.username === "") setUsernameError(true);
    if (form.password === "") setPasswordError(true);
  };
  // const login = async () => {
  //   await axios
  //     .post("http://localhost:8081/api/auth/signin", form)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  //   console.log("hello");
  // };
  return (
    <div className="container-login">
      <div class="signup-form">
        <div className="form">
          <h2>Đăng nhập</h2>
          {error ? (
            <div className="form-group message-error">
              Tài khoản hoặc mật khẩu nhập vào không chính xác
            </div>
          ) : (
            <></>
          )}

          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="username"
              value={form.username}
              onChange={onUpdateField}
              placeholder="Tên đăng nhập"
            />
          </div>
          <div className="form-item__error">
            {usernameError ? <p>Tài khoản là bắt buộc</p> : <></>}
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              onChange={onUpdateField}
              value={form.password}
              placeholder="Mật khẩu"
            />
          </div>
          <div className="form-item__error">
            {passwrodError ? <p>Mật khẩu là bắt buộc</p> : <></>}
          </div>
          <div
            class="form-group pb-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <label class="float-left form-check-label">
              <input
                type="checkbox"
                name="remember"
                value={form.remember}
                onChange={onUpdateField}
              />{" "}
              Lưu đăng nhập
            </label>
            <Link className="text-login" to={"/login"}>
              Quên mật khẩu?
            </Link>
          </div>
          <div class="form-group d-flex justify-content-center">
            <button
              onClick={submitLogin}
              class="btn btn-primary btn-lg btn-block"
            >
              ĐĂNG NHẬP
            </button>
          </div>
        </div>
        <div class="text-center" style={{ color: "white" }}>
          Bạn chưa có tài khoản?{" "}
          <Link className="text-login" to={"/signup"}>
            Tạo tài khoản
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
