import React, { useState } from "react";
import "./Button.css";
import { Power } from "react-bootstrap-icons";
const ButtonPrimary = ({ title, style }) => {
  return (
    <div class="custom-button custom-button-primary" style={style}>
      {title}
    </div>
  );
};
const ButtonSuccess = ({ children, title, style }) => {
  return (
    <div class="custom-button custom-button-success" style={style}>
      {children}
      {title}
    </div>
  );
};
const ButtonError = ({ title, style }) => {
  return (
    <div class="custom-button custom-button-error" style={style}>
      {title}
    </div>
  );
};
const ButtonPower = ({ title }) => {
  const [state, setState] = useState(false);
  return (
    <div className="">
      <div
        onClick={() => setState(!state)}
        className={state ? "custom-button-power" : "custom-button-power off"}
      >
        <Power size={40} color={"white"} />
      </div>
      <span style={{ fontSize: "12px", marginTop: "2px" }}>
        {state ? "Đang bật" : "Đang tắt"}
      </span>
    </div>
  );
};
const ToggleSwitch = ({ value, click }) => {
  return (
    <div className={!value ? "switch" : "switch switch-on"} onClick={click}>
      <div
        className={!value ? "switch-slider" : "switch-slider switch-slider__on"}
      ></div>
    </div>
  );
};
export { ButtonPrimary, ButtonPower, ButtonError, ButtonSuccess, ToggleSwitch };
