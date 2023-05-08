import React from "react";
import "./Status.css";
const StatusRunning = ({ title }) => {
  return <div className="container-status status-running">ĐANG HOẠT ĐỘNG</div>;
};
const StatusActive = ({ title }) => {
  return <div className="container-status status-running">ACTIVE</div>;
};
const StatusDisabled = ({ title }) => {
  return <div className="container-status status-off">DISABLED</div>;
};
const StatusOff = ({ title }) => {
  return <div className="container-status status-off">ĐANG TẮT</div>;
};
const StatusStandby = ({ title }) => {
  return <div className="container-status status-standby">ĐANG CHỜ</div>;
};
const StatusUnplugged = ({ title }) => {
  return <div className="container-status status-unplugged">KHÔNG KẾT NỐI</div>;
};
function Status({ index }) {
  switch (index) {
    case 1:
      return <StatusRunning />;
    case 2:
      return <StatusOff />;
    case 3:
      return <StatusStandby />;
    case 4:
      return <StatusUnplugged />;
    case 5:
      return <StatusActive />;
    case 6:
      return <StatusDisabled />;
    default:
      break;
  }
}
export default Status;
