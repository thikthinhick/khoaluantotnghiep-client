import React from "react";
import loading from "../../src/assets/images/loading-v2.gif";
function Loading() {
  return (
    <div
      style={{
        background: "white",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={loading} style={{ height: "40px", width: "40px" }} />
    </div>
  );
}

export default Loading;
