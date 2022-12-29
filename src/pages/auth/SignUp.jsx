import React from "react";
import "./styles.css";
function SignUp() {
  return (
    <div className="container-login">
      <div class="signup-form">
        <form action="/examples/actions/confirmation.php" method="post">
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
        </form>
        <div class="text-center" style={{ color: "white" }}>
          Bạn đã có tài khoản?{" "}
          <a href="login.html" className="text-login">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
