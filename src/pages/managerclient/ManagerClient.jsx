import React from "react";
import "./ManagerClient.css";
function ManagerClient() {
  return (
    <div className="grid-container">
      <div className="item">
        <select name="cars" id="cars">
          <option value="1">Chạy</option>
          <option value="2">Tắt</option>
          <option value="3">Chế độ chờ</option>
          <option value="4">Không kết nối</option>
        </select>
      </div>
    </div>
  );
}

export default ManagerClient;
