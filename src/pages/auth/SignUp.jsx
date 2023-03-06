import React from "react";
import { useState } from "react";
import { useStore } from "../../store/AppProvider";
import "./styles.css";
import { Link } from "react-router-dom";
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
function SignUp() {
  const { signup } = useStore();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    accept: false,
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [token, setToken] = useState("");
  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  const submitSignup = async () => {
    let nextErrorState = {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
    };
    for (let key in form) {
      if (form[key].length === 0) {
        nextErrorState = {
          ...nextErrorState,
          [key]: "Không thể để trống mục này",
        };
      }
    }
    if (
      form.password !== form.confirm_password &&
      !nextErrorState.confirm_password
    ) {
      nextErrorState = {
        ...nextErrorState,
        confirm_password: "Mật khẩu không khớp",
      };
    }
    if (form.username.length < 8 && !nextErrorState.username)
      nextErrorState = {
        ...nextErrorState,
        username: "Tài khoản phải ít nhất 8 kí tự",
      };
    if (form.password.length < 8 && !nextErrorState.password)
      nextErrorState = {
        ...nextErrorState,
        password: "Mật khẩu phải ít nhất 8 kí tự",
      };
    if (
      form.password !== form.confirm_password &&
      !nextErrorState.confirm_password
    )
      nextErrorState = {
        ...nextErrorState,
        confirm_password: "Mật khẩu phải ít nhất 8 kí tự",
      };
    if (!ValidateEmail(form.email) && !nextErrorState.email)
      nextErrorState = {
        ...nextErrorState,
        email: "Email không hợp lệ",
      };
    let count = 0;
    for (let value in nextErrorState) {
      if (nextErrorState[value] === "") count++;
    }
    if (count === 4) {
      try {
        await signup(form);
      } catch (error) {}
    }
    setError({ ...error, ...nextErrorState });
  };
  return (
    <div className="container-login">
      {!token ? (
        <div class="signup-form">
          <div className="form">
            <h2>Tạo tài khoản</h2>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                value={form.username}
                onChange={onUpdateField}
                name="username"
                placeholder="Username"
                required="required"
              />
            </div>
            <div className="form-item__error">
              <p>{error.username}</p>
            </div>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                name="email"
                value={form.email}
                onChange={onUpdateField}
                placeholder="Email"
                required="required"
              />
            </div>
            <div className="form-item__error">
              <p>{error.email}</p>
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                name="password"
                value={form.password}
                onChange={onUpdateField}
                placeholder="Mật khẩu"
                required="required"
              />
            </div>
            <div className="form-item__error">
              <p>{error.password}</p>
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                value={form.confirm_password}
                onChange={onUpdateField}
                name="confirm_password"
                placeholder="Xác nhận mật khẩu"
                required="required"
              />
            </div>
            <div className="form-item__error">
              <p>{error.confirm_password}</p>
            </div>
            <div class="form-group pb-2">
              <label class="float-left form-check-label">
                <input
                  type="checkbox"
                  name="accept"
                  value={form.accept}
                  onChange={() => setForm({ ...form, accept: !form.accept })}
                />{" "}
                Đồng ý với <Link to="/login">Điều khoản dịch vụ</Link>
              </label>
            </div>
            <div class="form-group">
              <button
                disabled={!form.accept}
                type="submit"
                class="btn btn-success btn-lg btn-block"
                onClick={submitSignup}
              >
                TẠO TÀI KHOẢN
              </button>
            </div>
          </div>
          <div class="text-center" style={{ color: "white" }}>
            Bạn đã có tài khoản?{" "}
            <Link className="text-login" to={"/login"}>
              Đăng nhập
            </Link>
          </div>
        </div>
      ) : (
        <div class="signup-form">
          <div className="form">
            <h2>Xác nhận tạo tài khoản</h2>
            <div
              style={{
                background: "#008BCA",
                width: "450px",
                padding: "15px",
                borderRadius: "4px",
                fontSize: "14px",
                color: "white",
              }}
            >
              <p style={{ fontSize: "13px" }}>
                Chào mừng <b>Chương</b>, tài khoản của bạn đã được đăng ký thành
                công. Chúng ta đã gửi cho bạn một email để kích hoạt tài khoản
                vui lòng kiểm tra hộp thư để kích hoạt tài khoản.
              </p>
              <br></br>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
