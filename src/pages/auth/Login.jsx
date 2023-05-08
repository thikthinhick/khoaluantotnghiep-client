import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/AppProvider";
import "./styles.css";
import axios from "axios";
function Login() {
  const { login, user, setLoading } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });
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
        setLoading(false);
        if (error.code === "ERR_NETWORK")
          setError("Không thể kết nối với máy chủ");
        else if (error.code === "ERR_BAD_REQUEST")
          setError("Tài khoản hoặc mật khẩu không chính xác");
      }
    }
    if (form.username === "") setUsernameError(true);
    if (form.password === "") setPasswordError(true);
  };

  return (
    <div className="container-login">
      <div className="signup-form">
        <div className="form">
          <h2>Đăng nhập</h2>
          {error ? (
            <div className="form-group message-error">{error}</div>
          ) : (
            <></>
          )}

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="username"
              value={form.username}
              onChange={onUpdateField}
              placeholder="Tên đăng nhập"
            />
          </div>
          <div className="form-item__error">
            {usernameError ? <p>Tài khoản là bắt buộc</p> : <></>}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
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
            className="form-group pb-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <label className="float-left form-check-label">
              <input
                type="checkbox"
                name="remember"
                value={form.remember}
                onChange={onUpdateField}
              />{" "}
              Lưu đăng nhập
            </label>
            <Link className="text-login" to={"/forgot-password"}>
              Quên mật khẩu?
            </Link>
          </div>
          <div className="form-group d-flex justify-content-center">
            <button
              onClick={submitLogin}
              className="btn btn-primary btn-lg btn-block"
            >
              ĐĂNG NHẬP
            </button>
          </div>
        </div>
        <div className="text-center" style={{ color: "white" }}>
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
