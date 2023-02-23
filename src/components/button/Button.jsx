import React from "react";
import "./Button.css";
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
const ToggleSwitch = () => {
  return (
    <label class="switch">
      <input type="checkbox" />
      <span class="slider round"></span>
    </label>
  );
};
export { ButtonPrimary, ButtonError, ButtonSuccess, ToggleSwitch };
