import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="container-login">
      <div class="signup-form">
        <div className="form">
          <h2>Tạo tài khoản</h2>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Username"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Mật khẩu"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="confirm_password"
              placeholder="Xác nhận mật khẩu"
              required="required"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success btn-lg btn-block">
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
    </div>
  );
}

export default SignUp;
