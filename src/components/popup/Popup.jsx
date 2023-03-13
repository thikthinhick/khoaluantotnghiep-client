import React, { Fragment, useState } from "react";
import "./Popup.css";
function Popup(props) {
  return (
    <Fragment>
      {props.show ? (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-content__header">
              <span onClick={() => props.close(false)}>&times;</span>
              <h4>{props.title}</h4>
            </div>
            <div className="modal-content__body">{props.children}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {props.trigger}
    </Fragment>
  );
}

export default Popup;
