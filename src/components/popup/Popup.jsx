import React, { Fragment, useState } from "react";
import "./Popup.css";
function Popup(props) {
  const [show, setShow] = useState(false);
  const closeHandler = (e) => {
    setShow(false);
  };
  return (
    <Fragment>
      {show ? (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-content__header">
              <span onClick={closeHandler}>&times;</span>
              <h4>{props.title}</h4>
            </div>
            <div className="modal-content__body">{props.children}</div>
            <button onClick={() => setShow(false)}>Huy</button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <button
        onClick={() => setShow(true)}
        style={{
          width: "fit-content",
          padding: "0px",
          margin: "0px",
        }}
      >
        {props.trigger}
      </button>
    </Fragment>
  );
}

export default Popup;
