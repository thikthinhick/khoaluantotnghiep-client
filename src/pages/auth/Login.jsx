import React from "react";
import "./styles.css";
function Login() {
  return (
    <div className="container-login">
      <div class="signup-form">
        <form action="index.html" method="get">
          <h2>Đăng nhập</h2>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="username"
              placeholder="Tên đăng nhập"
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
          <div
            class="form-group pb-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <label class="float-left form-check-label">
              <input type="checkbox" /> Lưu đăng nhập
            </label>
            <a href="#" class="float-right text-login">
              Quên mật khẩu?
            </a>
          </div>
          <div class="form-group d-flex justify-content-center">
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              TẠO TÀI KHOẢN
            </button>
          </div>
        </form>
        <div class="text-center" style={{ color: "white" }}>
          Bạn chưa có tài khoản?{" "}
          <a href="register.html" className="text-login">
            Tạo tài khoản
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
