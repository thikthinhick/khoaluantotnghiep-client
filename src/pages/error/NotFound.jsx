import React from "react";
import "./error.css";
function NotFound() {
  return (
    <div className="container-error">
      <center>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>404 - Page not found!</h1>
        <p style={{ fontSize: "16px", color: "white" }}>
          Oops! Trang yêu cầu của bạn yêu cầu không tồn tại :(<br></br>
          <br></br>
          Có lẽ bạn đang gặp một số vấn đề sau:<br></br>• Đường dẫn bị hỏng
          <br></br>• Trang này chưa bảo giờ tồn tại<br></br>
          • Trang này đã bị xóa
          <br />
          <br />
          <br />
        </p>
        <h3>
          <a href="/">Bấm vào đây về trang chủ</a>
        </h3>
        <br></br>
        <br></br>
      </center>
    </div>
  );
}

export default NotFound;
