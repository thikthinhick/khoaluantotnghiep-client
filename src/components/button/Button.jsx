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
export { ButtonPrimary, ButtonError, ButtonSuccess };
