import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../contants/Contants";
import "./styles.css";
import { useStore } from "../../store/AppProvider";
function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { setLoading } = useStore();
  const forgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        URL.concat("api/auth/forgot_password"),
        {
          email: email,
        }
      );
      if (response.status === 200) {
        setMessage(
          "Chúng tôi đã gửi một email có lên kết để đặt lại mật khẩu của bạn. Có thể mất từ 1 đến 2 phút để hoàn thành. Hãy kiểm tra hộp thư đến của bạn"
        );
      }
    } catch (error) {
      alert("Không thể kết nối với server");
    }

    setLoading(false);
  };
  return (
    <div className="container-login">
      <div class="signup-form">
        <div className="form">
          <h2>Quên mật khẩu</h2>
          {message ? (
            <div className="form-group message-success">
              {message}
              <b>{email}</b>
            </div>
          ) : (
            <></>
          )}
          <p style={{ fontSize: "13px", color: "gray", fontWeight: "500" }}>
            Bạn quên mật khẩu của mình? Đừng lo lắng! Hãy cung cấp cho chúng tôi
            email bạn sử dụng để đăng ký tài khoản. Chúng tôi sẽ gửi cho bạn một
            liên kết để đặt lại mật khẩu của bạn qua email đó.
          </p>
          <div>
            <br></br>
            <div class="form-group">
              <label for="fname">Nhập email:</label>
              <input
                style={{
                  width: "100%",
                  padding: "5px",
                  marginTop: "3px",
                }}
                type="text"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
              />
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-success btn-lg btn-block"
                style={{ minWidth: "200px", marginTop: "10px" }}
                onClick={() => forgotPassword()}
              >
                GỬI EMAIL CHO TÔI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
